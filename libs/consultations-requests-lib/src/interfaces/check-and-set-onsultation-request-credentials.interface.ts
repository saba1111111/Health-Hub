export interface consultationRequestCredentials {
  minAge?: number;
  maxAge?: number;
  minExperience?: number;
  maxExperience?: number;
  minRatePerHour?: number;
  maxRatePerHour?: number;
  gender?: string;
  cities?: Array<number>;
  specializations?: Array<number>;
}
