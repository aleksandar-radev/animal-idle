import React from 'react';
import useDataManager from '@/hooks/general/useDataManager';
import './Container.scss';
import CurrenciesBar from '@/ui/common/CurrenciesBar';
import MainMenu from '@/ui/common/MainMenu';
import MainScreen from '@/ui/common/MainScreen';
import useSettings from '@/hooks/general/useSettings';
import Settings from '@/models/Settings';

const Container = () => {
  const isLoaded = useDataManager();
  const settings = useSettings();

  React.useEffect(() => {
    (async () => {
      try {
        settings.activeMainScreenTab = Settings.MAIN_SCREEN_CHARACTER_TAB;
      } catch (error) {}
    })();
  }, [isLoaded]);

  const renderContent = () => {
    if (isLoaded) {
      return (
        <div className="Container-auth">
          <CurrenciesBar />
          <MainMenu />
          <MainScreen />
        </div>
      );
    } else {
      return <div className="Container-empty"></div>;
    }
  };

  return <div className={'Container'}>{renderContent()}</div>;
};

export default Container;
