import { useEffect, useState } from 'react';
import './MainMenu.scss';
import useGameStore from '@/hooks/general/useGameStore';
import useAuthRepo from '@/hooks/general/useAuthRepo';
import Settings from '@/models/Settings';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Popper } from '@mui/material';
import useTranslations from '@/hooks/general/useTranslations';
import shopMenu from '@/assets/shop-menu.png';
import characterMenu from '@/assets/character-menu.png';
import battleMenu from '@/assets/battle-menu.png';
import leaderboardMenu from '@/assets/leaderboard-menu.png';
import settingsMenu from '@/assets/settings-menu.png';
import adminMenu from '@/assets/admin-menu.png';
import exitDoor from '@/assets/exit-door.png';

const MainMenu = () => {
  const { settings } = useGameStore();
  const [currentUser, setCurrentUser] = useState(null);
  const authRepo = useAuthRepo();
  const [openExitDialog, setOpenExitDialog] = useState(false);
  const t = useTranslations();
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeTooltip, setActiveTooltip] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const user = await authRepo.getUser();
      setCurrentUser(user);
    };
    getUser();
  }, []);

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>, tabName: string) => {
    setAnchorEl(event.currentTarget);
    setActiveTooltip(tabName);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
    setActiveTooltip(null);
  };
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

  const renderTab = (tabName: string, tabSetting: string, icon: string = null) => (
    <div
      key={tabName}
      className={`tab ${isActiveTab(tabSetting) && 'active'}`}
      onClick={() => changeView(tabSetting)}
      onMouseEnter={(e) => handleMouseEnter(e, tabName)}
      onMouseLeave={handleMouseLeave}>
      <img className="menu-icon" src={icon} alt={''} />
    </div>
  );

  return (
    <div className={'MainMenu'}>
      {!settings.isFightStarted && (
        <>
          {renderTab('characters', Settings.MAIN_SCREEN_CHARACTER_TAB, characterMenu)}
          {renderTab('fight', Settings.MAIN_SCREEN_FIGHT_TAB, battleMenu)}
          {renderTab('shop', Settings.MAIN_SCREEN_SHOP_TAB, shopMenu)}
          {renderTab('leaderboard', Settings.MAIN_SCREEN_LEADERBOARD_TAB, leaderboardMenu)}
          {renderTab('settings', Settings.MAIN_SCREEN_SETTINGS_TAB, settingsMenu)}
          {currentUser?.role === 'admin' && renderTab('admin', Settings.MAIN_SCREEN_ADMIN_TAB, adminMenu)}
        </>
      )}
      {settings.isFightStarted && (
        <>
          <div
            className={`tab exit-fight`}
            onClick={handleExitFightClick}
            onMouseEnter={(e) => handleMouseEnter(e, 'exit')}
            onMouseLeave={handleMouseLeave}>
            <img className="menu-icon" src={exitDoor} alt={''} />
          </div>
        </>
      )}
      <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement="right" disablePortal>
        <div className="tooltip">{t[`${activeTooltip}-tooltip`]}</div>
      </Popper>
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
