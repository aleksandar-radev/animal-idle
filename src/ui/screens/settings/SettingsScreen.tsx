import './SettingsScreen.scss';
import useTranslations from '@/hooks/general/useTranslations';
import { useNavigate } from 'react-router-dom';
import useDataRepo from '@/hooks/general/useDataRepo';
import useAuthRepo from '@/hooks/general/useAuthRepo';

const SettingsScreen = () => {
  const navigate = useNavigate();
  const dataRepo = useDataRepo();
  const authRepo = useAuthRepo();
  const t = useTranslations();

  const logout = async () => {
    navigate('/login');
    await authRepo.signOut();
  };
  const resetProgress = async () => {
    const user = await authRepo.getUser();
    await dataRepo.updateDataByUserId(user.id, {});
  };

  return (
    <div className={'SettingsScreen'}>
      <div className={`button`} onClick={resetProgress}>
        {t.resetProgress}
      </div>
      <div className={`button`} onClick={logout}>
        {t.logout}
      </div>
    </div>
  );
};

export default SettingsScreen;
