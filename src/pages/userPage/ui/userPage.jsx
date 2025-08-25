import React from 'react';
import { useParams } from 'react-router-dom';
import { MeetingsCard } from '@shared/ui/meetingsCard';
import { UserCard } from '@features/userCard';
import { QualitiesCard } from '@widgets/qualityCard';
import { CommentsCard } from '@widgets/commentsCard';
import { useUser } from '@features/user';
import { CommentsProvider } from '@features/comments';
import { AboutCard } from '@widgets/aboutCard';

const UserPage = () => {
  const { userId } = useParams();
  const { getUserById } = useUser();
  const user = getUserById(userId);

  if (user) {
    return (
      <div className="container">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <UserCard user={user} />
            <QualitiesCard data={user.qualities} />
            <MeetingsCard value={user.completedMeetings} />
          </div>
          <div className="col-md-8">
            <AboutCard text={user.about} />
            <CommentsProvider>
              <CommentsCard />
            </CommentsProvider>
          </div>
        </div>
      </div>
    );
  }
};

export default UserPage;
