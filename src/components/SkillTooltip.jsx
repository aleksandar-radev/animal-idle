import { PropTypes } from 'prop-types';
import './SkillTooltip.scss';

const SkillTooltip = ({ name, cooldown }) => {
  return (
    <div className="SkillTooltip">
      <p>{name}</p>
      <p>{cooldown} s</p>
    </div>
  );
};

SkillTooltip.propTypes = {
  name: PropTypes.string,
  cooldown: PropTypes.number,
};

export default SkillTooltip;
