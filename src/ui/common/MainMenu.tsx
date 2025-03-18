import { useEffect, useState } from 'react';
import './MainMenu.scss';
import useGameStore from '@/hooks/general/useGameStore';
import useAuthRepo from '@/hooks/general/useAuthRepo';
import Settings from '@/models/Settings';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Popper } from '@mui/material';
import useTranslations from '@/hooks/general/useTranslations';
import shopMenuIcon from '@/assets/shop-menu.png';
import characterMenuIcon from '@/assets/character-menu.png';
import battleMenuIcon from '@/assets/battle-menu.png';
import leaderboardMenuIcon from '@/assets/leaderboard-menu.png';
import settingsMenuIcon from '@/assets/settings-menu.png';
import adminMenuIcon from '@/assets/admin-menu.png';
import docsIcon from '@/assets/docs.png';
import exitDoorIcon from '@/assets/exit-door.png';

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
          {renderTab('characters', Settings.MAIN_SCREEN_CHARACTER_TAB, characterMenuIcon)}
          {renderTab('fight', Settings.MAIN_SCREEN_FIGHT_TAB, battleMenuIcon)}
          {renderTab('shop', Settings.MAIN_SCREEN_SHOP_TAB, shopMenuIcon)}
          {renderTab('leaderboard', Settings.MAIN_SCREEN_LEADERBOARD_TAB, leaderboardMenuIcon)}
          {renderTab('settings', Settings.MAIN_SCREEN_SETTINGS_TAB, settingsMenuIcon)}
          {renderTab('docs', Settings.MAIN_SCREEN_DOCS_TAB, docsIcon)}
          {currentUser?.role === 'admin' && renderTab('admin', Settings.MAIN_SCREEN_ADMIN_TAB, adminMenuIcon)}
        </>
      )}
      {settings.isFightStarted && (
        <>
          <div
            className={`tab exit-fight`}
            onClick={handleExitFightClick}
            onMouseEnter={(e) => handleMouseEnter(e, 'exit')}
            onMouseLeave={handleMouseLeave}>
            <img className="menu-icon" src={exitDoorIcon} alt={''} />
          </div>
        </>
      )}
      <Popper className="tooltip" open={Boolean(anchorEl)} anchorEl={anchorEl} placement="right" disablePortal>
        <div>{t[`${activeTooltip}-tooltip`]}</div>
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
