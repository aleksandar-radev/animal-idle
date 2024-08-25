import { useEffect, useState } from 'react';
import './MainMenu.scss';
import useStore from '@/hooks/useStore';
import useAuthRepo from '@/hooks/useAuthRepo';
import Settings from '@/models/Settings';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import useTranslations from '@/hooks/useTranslations';

const MainMenu = () => {
  const { settings } = useStore();
  const [currentUser, setCurrentUser] = useState(null);
  const authRepo = useAuthRepo();
  const [openExitDialog, setOpenExitDialog] = useState(false);
  const t = useTranslations();

  useEffect(() => {
    const getUser = async () => {
      const user = await authRepo.getUser();
      setCurrentUser(user);
    };
    getUser();
  }, []);

  const changeView = (view) => {
    settings.activeCharacter = null;
    settings.activeMainScreenTab = view;
  };

  const isActiveTab = (tab) => {
    return settings.activeMainScreenTab === tab;
  };

  const handleExitFightClick = () => {
    setOpenExitDialog(true);
  };

  const handleExitFightConfirm = () => {
    setOpenExitDialog(false);
    changeView(Settings.MAIN_SCREEN_CHARACTER_TAB);
  };

  const handleExitFightCancel = () => {
    setOpenExitDialog(false);
  };

  return (
    <div className={'MainMenu'}>
      {!settings.isFightStarted && (
        <>
          <div
            className={`tab ${isActiveTab(Settings.MAIN_SCREEN_CHARACTER_TAB) && 'active'}`}
            onClick={() => changeView(Settings.MAIN_SCREEN_CHARACTER_TAB)}>
            {t['characters']}
          </div>
          <div
            className={`tab ${isActiveTab(Settings.MAIN_SCREEN_FIGHT_TAB) && 'active'}`}
            onClick={() => changeView(Settings.MAIN_SCREEN_FIGHT_TAB)}>
            {t['fight']}
          </div>
          <div
            className={`tab ${isActiveTab(Settings.MAIN_SCREEN_SHOP_TAB) && 'active'}`}
            onClick={() => changeView(Settings.MAIN_SCREEN_SHOP_TAB)}>
            {t['shop']}
          </div>
          <div
            className={`tab ${isActiveTab(Settings.MAIN_SCREEN_LEADERBOARD_TAB) && 'active'}`}
            onClick={() => changeView(Settings.MAIN_SCREEN_LEADERBOARD_TAB)}>
            {t['leaderboard']}
          </div>
          <div
            className={`tab ${isActiveTab(Settings.MAIN_SCREEN_SETTINGS_TAB) && 'active'}`}
            onClick={() => changeView(Settings.MAIN_SCREEN_SETTINGS_TAB)}>
            {t['settings']}
          </div>
          {currentUser?.role === 'admin' && (
            <div
              className={`tab ${isActiveTab(Settings.MAIN_SCREEN_ADMIN_TAB) && 'active'}`}
              onClick={() => changeView(Settings.MAIN_SCREEN_ADMIN_TAB)}>
              {t['admin']}
            </div>
          )}
        </>
      )}
      {settings.isFightStarted && (
        <>
          <div className={`tab exit-fight`} onClick={handleExitFightClick}>
            {t['exit-fight']}
          </div>
        </>
      )}
      <Dialog
        open={openExitDialog}
        onClose={handleExitFightCancel}
        className="exit-fight-dialog"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{'Confirm Exit Fight'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{t['exit-fight-confirm']}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleExitFightCancel}>{t['cancel']}</Button>
          <Button onClick={handleExitFightConfirm} autoFocus>
            {t['exit-fight']}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MainMenu;
