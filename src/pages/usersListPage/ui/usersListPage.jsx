import React, { useState, useEffect, useMemo } from 'react';
import { filterUsers } from '../model/getFilteredUsers';
import { paginate } from '@shared/lib/helpers';
import { SearchInput } from '@shared/ui/searchInput';
import { Pagination } from '@shared/ui/pagination';
import { Loader } from '@shared/ui/loader';
import { SearchStatus } from '@shared/ui/searchStatus';
import { ProfessionFilters } from '@entities/professionFilter';
import { useUser } from '@features/user';
import { UserTable } from '@widgets/userTable';
import _ from 'lodash';
import { useAuth } from '@features/auth';
import { useProfessions } from '@features/profession';

const UsersListPage = () => {
  const { users } = useUser();
  const { currentUser } = useAuth();
  const { isLoading: professionsLoading, professions } = useProfessions();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
  const [searchQuery, setSearchQuery] = useState('');
  const pageSize = 8;

  const handleToggleBookMark = (id) => {
    const newArray = users.map((user) => {
      if (user._id === id) {
        return { ...user, bookmark: !user.bookmark };
      }
      return user;
    });
    console.log(newArray);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf, searchQuery]);

  const handleProfessionSelect = (item) => {
    if (searchQuery !== '') setSearchQuery('');
    setSelectedProf(item);
  };
  const handleSearchQuery = ({ target }) => {
    setSelectedProf(undefined);
    setSearchQuery(target.value);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const clearFilter = () => {
    setSelectedProf(undefined);
    setSearchQuery('');
  };

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    return filterUsers(users, {
      searchQuery,
      selectedProf,
      currentUserId: currentUser._id,
    });
  }, [users, searchQuery, selectedProf, currentUser]);

  const count = filteredUsers.length;

  const sortedUsers = useMemo(() => {
    return _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
  }, [filteredUsers, sortBy]);

  const usersCrop = paginate(sortedUsers, currentPage, pageSize);

  if (professionsLoading || !professions) {
    return <Loader />;
  }

  return (
    <div className="container d-flex p-1 flex-column">
      <div className="d-flex align-items-center justify-content-between">
        <SearchInput onChange={handleSearchQuery} value={searchQuery} />
        <SearchStatus length={count} />
      </div>

      <div className="d-flex w-100 gap-3 flex-grow-1">
        <ProfessionFilters
          selectedProf={selectedProf}
          professions={professions}
          clearFilter={clearFilter}
          handleProfessionSelect={handleProfessionSelect}
        />
        {count > 0 && (
          <div className="d-flex flex-column align-items-center flex-grow-1">
            <UserTable
              users={usersCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onToggleBookMark={handleToggleBookMark}
            />
          </div>
        )}
      </div>
      {count > 0 && (
        <div className="d-flex flex-column align-items-center flex-grow-1">
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default UsersListPage;
