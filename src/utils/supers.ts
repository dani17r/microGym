import {
  DialogI,
  SuperFormT,
  SuperInputT,
  SuperInputUnionT,
} from "@/types/global";
import { UnwrapNestedRefs, reactive } from "vue";

const modelInput = <SuperInputUnionT>{
  rules: [],
  value: "",
  copy: "",
  ref: {},
  set(val: string) {
    this.copy = val;
    this.value = val;
  },
  isChange() {
    let value = JSON.stringify(this.value);
    let copy = JSON.stringify(this.copy);
    return value != copy;
  },
  validate() {
    if (this.ref?.validate) return !this.ref.validate();
    else return false;
  },
  isErrors() {
    if (this.ref?.hasError) {
      return this.ref.hasError;
    } else return false;
  },
  reset: function () {
    if (this.isChange()) this.value = this.copy;
    if (this.ref?.resetValidation) setTimeout(()=> this.ref.resetValidation());
  },
};

export const superForm = <T>(data: T): SuperFormT<T> => {

  let inputs = reactive(data as SuperInputT<T>) as SuperInputT<T>;

  for (const key in inputs) {
    inputs[key] = {
      ...modelInput,
      ...inputs[key],
    };
  }

  return reactive(<SuperFormT<T>>{
    ...(inputs as SuperInputUnionT),
    checkValidation() {
      for (const key in inputs) {
        if (this[key].validate()) return true;
      }
      return false;
    },
    checkIsErrors() {
      for (const key in inputs) {
        if (this[key].isErrors()) return true;
      }
      return false;
    },
    reset() {
      for (const key in inputs) {
        this[key].reset();
      }
    },
    update() {
      for (const key in inputs) {
        this[key].copy = this[key].value;
        this[key].reset();
      }
    },
    verifyIsNotChanges() {
      for (const key in inputs) {
        if (this[key].isChange()) return true;
      }
      return false;
    },
    getValues() {
      let data = <any>{}; 
      for (const key in inputs) {
        data[key] = this[key].value;
      }
      return data;
    }
  }) as SuperFormT<T>;
};

export const superModals = <T extends object>(data: T) => {
  const modals = reactive({
    ...data,
    toggle(name: keyof UnwrapNestedRefs<T>): boolean {
      return (modals[name] = !modals[name] as never);
    },
  });
  return modals;
};

export const superToggle = (val=false) =>
  reactive({
    value: val,
    toggle(): boolean {
      return (this.value = !this.value);
    },
  });

interface SuperMultiModalI<Status> {
  id?: string | null;
  status: Status;
  value?: boolean;
}

export const superMultiModal = <Status = string>({
  id = null,
  status,
  value = false,
}: SuperMultiModalI<Status>) =>
  reactive({
    value: value,
    id: <any>id,
    status: status,
    toggle(value = status) {
      this.status = value as Status;
      this.value = !this.value;
    },
    changeId(id: SuperMultiModalI<Status>["id"]) {
      if (id == null) this.id = id;
      else if (id != this.id) this.id = id;
    },
  }) as DialogI<Status>;

export const superModal = ({
  id = null,
  value = false,
}) =>
  reactive({
    value: value,
    id: <any>id,
    toggle() {
      this.value = !this.value;
    },
    changeId(id: string) {
      if (id == null && id) this.id = id;
      else if (id != this.id && id) this.id = id;
    },
  });
