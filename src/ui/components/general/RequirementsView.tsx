import Requirement from '@/models/Requirement';
import './RequirementsView.scss';
import useTranslations from '@/hooks/general/useTranslations';

const RequirementsView = ({ requirements }) => {
  const t = useTranslations();

  return (
    <div>
      {t['requirements']}:{' '}
      {requirements.map((req) => {
        if (req.type === Requirement.REQUIREMENT_TYPE_CURRENCY) {
          return (
            <div key={req.type}>
              {t[req.innerType]}: {req.value}
            </div>
          );
        }
        if (req.type === Requirement.REQUIREMENT_TYPE_LEVEL) {
          return <div key={req.type}>Required Level: {req.value}</div>;
        }
      })}
    </div>
  );
};

export default RequirementsView;
