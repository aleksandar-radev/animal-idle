import './HealthBar.scss';

const HealthBar = ({ currentHealth, totalHealth }) => {
  const percentage = (currentHealth / totalHealth) * 100;
  currentHealth = Math.floor(currentHealth);
  totalHealth = Math.floor(totalHealth);
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to right, hsl(calc(${percentage} * 1.2), 100%, 50%, 0.8)  ${percentage}%, rgba(255, 255, 255, 0.5) ${percentage}%)`,
      }}
      className={'HealthBar'}>{`${currentHealth} / ${totalHealth}`}</div>
  );
};

export default HealthBar;
