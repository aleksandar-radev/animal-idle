import './SettingsScreen.scss';
import { DataRepo } from '../../api/DataRepo';
import useTranslations from '../../hooks/useTranslations';
import { AuthRepo } from '../../api/AuthRepo';
import { useNavigate } from 'react-router-dom';

const SettingsScreen = () => {
  const navigate = useNavigate();
  const t = useTranslations();

  const logout = async () => {
    navigate('/login');
    await AuthRepo.signOut();
  };
  const resetProgress = async () => {
    const user = await AuthRepo.getUser();
    await DataRepo.updateDataById(user.id, {});
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
