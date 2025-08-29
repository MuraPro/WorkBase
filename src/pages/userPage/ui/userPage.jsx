import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MeetingsCard } from '@shared/ui/meetingsCard';
import { UserCard } from '@features/userCard';
import { getUserById } from '@entities/user';
import { AboutCard } from '@widgets/aboutCard';
import { CommentsCard } from '@widgets/commentsCard';
import { QualitiesCard } from '@widgets/qualityCard';

const UserPage = () => {
  const { userId } = useParams();
  const user = useSelector(getUserById(userId));

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
            <CommentsCard />
          </div>
        </div>
      </div>
    );
  }
};

export default UserPage;
