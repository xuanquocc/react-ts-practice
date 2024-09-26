interface RulesType {
    key: string;
    value: string | number;
  }
  
  interface ValidatorProps {
    isRequired?: RulesType[];
    minmax?: RulesType[];
  }
  
  export interface Errors {
    [index: string]: string;
  }
  
  export const validator = (rules: ValidatorProps) => {
    const errors: Errors = {};
    let valid: boolean = true;
  
    if (rules.isRequired) {
      rules.isRequired.map(({ key, value }) => {
        if (typeof value === "string") {
          if (value.length > 0) {
            errors[key] = "";
          } else {
            errors[key] = "require input value";
            valid = false;
          }
        } else {
          if (value > 0) {
            errors[key] = "";
          } else {
            errors[key] = "require input value";
            valid = false;
          }
        }
      }, []);
    }
  
    return { errors, valid };
  };