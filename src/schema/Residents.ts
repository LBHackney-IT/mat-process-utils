export interface Resident {
  id: string;
  fullName: string;
  dateOfBirth: string;
}

export interface Residents {
  tenants: Resident[];
  householdMembers: Resident[];
}
