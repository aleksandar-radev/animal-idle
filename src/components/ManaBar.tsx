import './ManaBar.scss';

const ManaBar = ({ currentMana, totalMana }) => {
  const percentage = (currentMana / totalMana) * 100;

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to right, rgba(50, 50, 255, 0.8) ${percentage}%, rgba(255, 255, 255, 0.5) ${percentage}%)`,
      }}
      className={'ManaBar'}>{`${currentMana} / ${totalMana}`}</div>
  );
};

export default ManaBar;
