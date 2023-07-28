export class Zone {
  private _id!: string;
  private _customerId: string;
  private _name: string;
  private _cgId: string;
  private _status: string;
  private _nbDevices: number;
  private _emails!: string;
  private _option: string;

  constructor(
    name: string,
    customerId: string,
    status: string = 'On',
    nbDevices: number = 0,
    cgId: string = '',
    options: string = ''
  ) {
    this._name = name;
    this._customerId = customerId;
    this._status = status;
    this._nbDevices = nbDevices;
    this._cgId = cgId;
    this._option = options;
  }

  /**
   * Getter id
   * @return {string}
   */
  public get id(): string {
    return this._id;
  }

  /**
   * Setter id
   * @param {string} value
   */
  public set id(value: string) {
    this._id = value;
  }

  /**
   * Getter customerId
   * @return {string}
   */
  public get customerId(): string {
    return this._customerId;
  }

  /**
   * Setter customerId
   * @param {string} value
   */
  public set customerId(value: string) {
    this._customerId = value;
  }

  /**
   * Getter name
   * @return {string}
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Setter name
   * @param {string} value
   */
  public set name(value: string) {
    this._name = value;
  }

  /**
   * Getter cgId
   * @return {string}
   */
  public get cgId(): string {
    return this._cgId;
  }

  /**
   * Setter cgId
   * @param {string} value
   */
  public set cgId(value: string) {
    this._cgId = value;
  }

  /**
   * Getter status
   * @return {string}
   */
  public get status(): string {
    return this._status;
  }

  /**
   * Setter status
   * @param {string} value
   */
  public set status(value: string) {
    this._status = value;
  }

  /**
   * Getter nbDevices
   * @return {number}
   */
  public get nbDevices(): number {
    return this._nbDevices;
  }

  /**
   * Setter nbDevices
   * @param {number} value
   */
  public set nbDevices(value: number) {
    this._nbDevices = value;
  }

  /**
   * Getter emails
   * @return {string}
   */
  public get emails(): string {
    return this._emails;
  }

  /**
   * Setter emails
   * @param {string} value
   */
  public set emails(value: string) {
    this._emails = value;
  }

  /**
   * Getter options
   * @return {string}
   */
  public get option(): string {
    return this._option;
  }

  /**
   * Setter options
   * @param {string} value
   */
  public set options(value: string) {
    this._option = value;
  }

  toPlainObj() {
    return {
      name: this._name,
      customerId: this._customerId,
      status: this._status,
      nbDevices: this._nbDevices,
      cgId: this._cgId,
      option: this._option,
    };
  }
}
