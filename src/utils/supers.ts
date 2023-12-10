// import { cloneDeep, isFunction } from "lodash";
import { UnwrapNestedRefs, reactive } from "vue";

interface ObjectFormI {
  value: unknown;
  rules: ((val: string) => true | string)[] | any[];
}

interface ObjectPlusFormI {
  set(val: string): void;
  isChange(): boolean;
  validate(): boolean;
  isErrors(): boolean;
  reset(): void;
  ref: any;
  copy: unknown;
}

interface BasicFormT {
  verifyIsNotChanges(): boolean;
  checkValidation(): boolean;
  checkIsErrors(): boolean;
  resetGeneral(): void;
}

type ObjectPartialFinallyFormI = { [key:string]: ObjectFormI & Partial<ObjectPlusFormI> };
type ObjectFinallyFormI = { [key:string]: ObjectFormI & ObjectPlusFormI };
type SuperFormT = ObjectPartialFinallyFormI & BasicFormT;


export const superForm = <T extends ObjectPartialFinallyFormI>(data: T): SuperFormT => {

  for (const key in data) {
    data[key].rules = data[key].rules ?? [];
    data[key].value = data[key].value ?? "";
    data[key].copy = data[key].value ?? "";
    data[key].ref = {};
    data[key].set = function (val: string) {
      this.copy = val;
      this.value = val;
    };
    data[key].isChange = function () {
      let value = JSON.stringify(this.value);
      let copy = JSON.stringify(this.copy);
      return value != copy;
    };
    data[key].validate = function () {
      if (this.ref) return !this.ref.validate();
      else return false;
    };
    data[key].isErrors = function () {
      if (this.ref) {
        return this.ref.hasError || !this.ref.modelValue?.length;
      } else return false;
    };
    data[key].reset = function () {
      if (this.ref.resetValidation) this.ref.resetValidation();
      if (this.isChange) {
        if (this.isChange()) this.value = this.copy;
      }
    };
  }
  
  const form = reactive<SuperFormT>({
    ...data,
    checkValidation() {
      // return this.name.validate() ||;
      return true;
    },
    checkIsErrors() {
      // return this.name.isErrors() ||;
      return false;
    },
    resetGeneral() {
      // for (const key in form) {
      //   if (!isFunction(form[key])) {
      //     form[key].reset();
      //   }
      // }
    },
    verifyIsNotChanges() {
      // return this.name.isChange() ||;
      return true;
    },
  });

  return form;
};

export const superModals = <T extends object>(data: T) => {
  const modals = reactive({
    ...data,
    toggle: (name: keyof UnwrapNestedRefs<T>): boolean => {
      return (modals[name] = !modals[name] as never);
    },
  });
  return modals;
};


class superForm_ <T>{
  public data: ObjectPartialFinallyFormI;

  constructor(data: T) {
    this.data = data as ObjectPartialFinallyFormI;

    for (const key in this.data) {
      this.data[key].rules = this.data[key].rules ?? [];
      this.data[key].value = this.data[key].value ?? "";
      this.data[key].copy = this.data[key].value ?? "";
      this.data[key].ref = {};
      this.data[key].set = function (_val: string) {
        // this.copy = val;
        // this.value = val;
      };
      this.data[key].isChange = function () {
        // let value = JSON.stringify(this.value);
        // let copy = JSON.stringify(this.copy);
        // return value != copy;
        return false;
      };
      this.data[key].validate = function () {
        // if (this.ref) return !this.ref.validate();
        // else return false;
        return false;
      };
      this.data[key].isErrors = function () {
        // if (this.ref) {
        //   return this.ref.hasError || !this.ref.modelValue?.length;
        // } else return false;
        return false;
      };
      this.data[key].reset = function () {
        // if (this.ref.resetValidation) this.ref.resetValidation();
        // if (this.isChange) {
        //   if (this.isChange()) this.value = this.copy;
        // }
      };
    }
  }
};


export class superFormClas<T> extends superForm_<T> {
  constructor(parameters: T) {
    super(parameters);
  }
  checkValidation() {
    // return this.name.validate() ||;
    return true;
  }
  checkIsErrors() {
    // return this.name.isErrors() ||;
    return false;
  }
  resetGeneral() {
    // for (const key in form) {
    //   if (!isFunction(form[key])) {
    //     form[key].reset();
    //   }
    // }
  }
  verifyIsNotChanges() {
    // return this.name.isChange() ||;
    return true;
  }
}