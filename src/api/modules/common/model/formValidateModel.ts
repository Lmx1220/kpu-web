export interface ValidateRules {
  // Field name
  field: string
  // Validation rules
  rules?: any[]
  // attrs?: any
}

export interface FieldValidatorDesc {
  field: string
  fieldType: string
  constraints: ConstraintInfo[]
}

export interface ConstraintInfo {
  type: string
  attrs: any
}
