import { AuthRepo } from '../api/AuthRepo';

const authRepoInstance = new AuthRepo();

const useAuthRepo = () => {
  return authRepoInstance;
};

export default useAuthRepo;
