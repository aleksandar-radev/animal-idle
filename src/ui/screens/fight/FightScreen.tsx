import CharacterResources from '@/ui/components/character/CharacterResources';
import EnemyAvatar from '@/ui/components/enemy/EnemyAvatar';
import EnemyResources from '@/ui/components/enemy/EnemyResources';
import './FightScreen.scss';
import useEnemyAttack from '@/hooks/gameActions/useEnemyAttack';
import useInitFight from '@/hooks/gameActions/useInitFight';
import CharacterGrid from '@/ui/components/character/CharacterGrid';
import useGameStore from '@/hooks/general/useGameStore';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import Settings from '@/models/Settings';
import FightLog from '@/ui/components/general/FightLog';
import ActiveSkillsBar from '@/ui/components/general/ActiveSkillsBar';
import useCharactersAttack from '@/hooks/gameActions/useCharactersAttack';

const FightScreen = () => {
  const { settings, fightState } = useGameStore();
  const [isDeathDialogOpen, setIsDeathDialogOpen] = useState(false);
  const { resetStats } = useInitFight();
  useEnemyAttack();
  const { setIsAttacking } = useCharactersAttack();

  useEffect(() => {
    if (!fightState.isAlive) {
      setIsDeathDialogOpen(true);
    }
  }, [fightState.isAlive]);

  const handleTryAgain = () => {
    setIsAttacking(false);
    resetStats();
    setIsDeathDialogOpen(false);
  };

  const handleGoBack = () => {
    settings.activeMainScreenTab = Settings.MAIN_SCREEN_CHARACTER_TAB;
    setIsDeathDialogOpen(false);
  };

  const handleCloseDialog = (event, reason) => {
    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
      setIsDeathDialogOpen(false);
    }
  };

  return (
    <div className={'FightScreen'}>
      {settings.isFightStarted ? (
        <>
          <CharacterGrid className={'FightScreen-self'} />
          <CharacterResources className={'FightScreen-self-res'} />
          <FightLog className={'FightScreen-log'} />
          <EnemyAvatar className={'FightScreen-enemy'} />
          <EnemyResources className={'FightScreen-enemy-res'} />
          <ActiveSkillsBar className={'FightScreen-skills'} />
        </>
      ) : (
        'Loading...'
      )}
      {!fightState.isAlive && (
        <>
          <Dialog open={isDeathDialogOpen} onClose={handleCloseDialog}>
            <DialogTitle>You have been defeated!</DialogTitle>
            <DialogContent>Would you like to try again or go back to the main screen?</DialogContent>
            <DialogActions>
              <Button onClick={handleTryAgain}>Try Again</Button>
              <Button onClick={handleGoBack}>Go Back</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default FightScreen;
