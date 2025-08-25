// DirectAssociationForm.jsx

import React, { useState } from 'react';

const DirectAssociationForm = () => {
  const [word, setWord] = useState('');
  const [association, setAssociation] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const openaiKey = import.meta.env.VITE_OPENAI_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!word.trim() || !openaiKey) return;

    setLoading(true);
    setAssociation('');
    setImageUrl('');

    try {
      // Запрос к GPT с моделью gpt-3.5-turbo
      const chatRes = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${openaiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content:
                  'Ты переводишь звучание корейских слов в русские ассоциации, одно слово.',
              },
              {
                role: 'user',
                content: `Придумай одно короткое русское слово, которое звучит похоже на корейское слово "${word}". Просто одно слово без объяснений.`,
              },
            ],
          }),
        }
      );

      if (!chatRes.ok) {
        const errorText = await chatRes.text();
        throw new Error(
          `GPT API error: ${chatRes.status} ${chatRes.statusText}: ${errorText}`
        );
      }

      const chatData = await chatRes.json();

      if (!chatData.choices || !chatData.choices[0]) {
        throw new Error('Ответ GPT не содержит choices');
      }

      const assoc = chatData.choices[0].message.content.trim();
      setAssociation(assoc);

      // Запрос к генерации картинки
      const imgRes = await fetch(
        'https://api.openai.com/v1/images/generations',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${openaiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: assoc,
            n: 1,
            size: '512x512',
          }),
        }
      );

      if (!imgRes.ok) {
        const errorText = await imgRes.text();
        throw new Error(
          `Image API error: ${imgRes.status} ${imgRes.statusText}: ${errorText}`
        );
      }

      const imgData = await imgRes.json();

      if (!imgData.data || !imgData.data[0] || !imgData.data[0].url) {
        throw new Error(
          'Ответ OpenAI Images не содержит ссылку на изображение'
        );
      }

      setImageUrl(imgData.data[0].url);
    } catch (err) {
      console.error('Ошибка:', err);
      alert('Произошла ошибка при запросе к OpenAI API. Проверьте консоль.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 20 }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={word}
          onChange={(e) =>
            e.target.value.length <= 20 && setWord(e.target.value)
          }
          placeholder="Введите корейское слово"
          style={{ width: '100%', padding: 10 }}
        />
        <button disabled={loading} style={{ marginTop: 10 }}>
          {loading ? 'Загрузка...' : 'Получить ассоциацию'}
        </button>
      </form>

      {association && (
        <h3 style={{ marginTop: 20 }}>Ассоциация: {association}</h3>
      )}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={association}
          style={{ width: '100%', marginTop: 10 }}
        />
      )}
    </div>
  );
};

export default DirectAssociationForm;
