import { AuthRepo } from '@/utils/api/AuthRepo';

const authRepoInstance = new AuthRepo();

const useAuthRepo = () => {
  return authRepoInstance;
};

export default useAuthRepo;
