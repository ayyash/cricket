import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { makeDate } from '../../core/common';

// create a static group

export const matchPasswordFn = (pwd: AbstractControl): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    // get password and match, if equal return null
    if (control?.value === pwd?.value) {
      return null;
    }
    return {
      matchPassword: true
    };
  };
};

// validate file size to be what?
export const sizeValidatorFn = (params: {size: number, max: number}): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    // convert max from KB to bytes
    const _max = params.max * 1024;
    if (params.size > _max) {
      return {
        size: true
      };
    }

    return null;
  };
};

export const atleastOne = (control: AbstractControl): ValidationErrors | null => {
  // if all controls are false, return error
  const values = Object.values(control.value);
  if (values.some(v => v === true)) {
    return null;
  }
  return { atleastOne: true };

};


// date range validator with both dates, this should be enough
export const dateRangeValidatorFn = (params: {minDate?: string, maxDate?: string}): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    // make two dates if one is null, the other takes over, if both null, return null.
    const _min = makeDate(params.minDate);
    const _max = makeDate(params.maxDate);
    if (!_min && !_max) return null;

    // if both exist, range
    // if only one exists, check against that
    const _minDate = _min ? +_min : null;
    const _maxDate = _max ? +_max : null;
    const value = +(new Date(control.value));

    // if only min
    const future = _maxDate ? value < _maxDate : true;
    const past = value > _minDate;
    if (future && past) {
      return null;
    }

    return {
      dateRange: true
    };
  };
};

export const InputValidators = new Map<string, any >([
  ['matchPassword', matchPasswordFn],
  ['dateRangeFn', dateRangeValidatorFn],
  ['sizeFn', sizeValidatorFn],
  ['atleastOne', atleastOne]
]);

