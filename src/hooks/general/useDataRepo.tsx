import { DataRepo } from '@/utils/api/DataRepo';

const dataRepoInstance = new DataRepo();

const useDataRepo = () => {
  return dataRepoInstance;
};

export default useDataRepo;
