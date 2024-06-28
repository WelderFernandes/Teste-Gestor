import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import { BpCheckedIcon, BpIcon } from "./BpIcon";

// Inspired by blueprintjs
function CustomCheckbox(props: CheckboxProps) {

  return (
    <Checkbox
      disableRipple
      color={props.color ? props.color : 'default'}
      checkedIcon={
        <BpCheckedIcon
        sx={{
          backgroundColor: props.color ? `${props.color}.main` : 'primary.main',
        }}
        />
      }
      icon={<BpIcon />}
      inputProps={{ 'aria-label': 'Checkbox demo' }}
      {...props}
      />
  );
}

export default CustomCheckbox;
