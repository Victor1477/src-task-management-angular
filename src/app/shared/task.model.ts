export class Task {
  constructor(
    public id: number,
    public code: string,
    public description: string,
    public createdDate: Date,
    public featureFlagName: string,
    public notes: string,
    public isActive: boolean = true
  ) {}
}
