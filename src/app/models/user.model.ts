export class User {
  private _id!: string;
  private _username: string;
  private _password: string;
  private _role: string;
  private _status: string;
  private _clientId: string;
  private _zoneId: string;
  private _type: string;
  private _region: string;

  constructor(
    username: string,
    password: string,
    role: string,
    status: string,
    clientId: string,
    zoneId: string,
    type: string,
    region: string
  ) {
    this._username = username;
    this._password = password;
    this._role = role;
    this._status = status;
    this._clientId = clientId;
    this._zoneId = zoneId;
    this._type = type;
    this._region = region;
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
   * Getter username
   * @return {string}
   */
  public get username(): string {
    return this._username;
  }

  /**
   * Setter username
   * @param {string} value
   */
  public set username(value: string) {
    this._username = value;
  }

  /**
   * Getter password
   * @return {string}
   */
  public get password(): string {
    return this._password;
  }

  /**
   * Setter password
   * @param {string} value
   */
  public set password(value: string) {
    this._password = value;
  }

  /**
   * Getter role
   * @return {string}
   */
  public get role(): string {
    return this._role;
  }

  /**
   * Setter role
   * @param {string} value
   */
  public set role(value: string) {
    this._role = value;
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
   * Getter clientId
   * @return {string}
   */
  public get clientId(): string {
    return this._clientId;
  }

  /**
   * Setter clientId
   * @param {string} value
   */
  public set clientId(value: string) {
    this._clientId = value;
  }

  /**
   * Getter zoneId
   * @return {string}
   */
  public get zoneId(): string {
    return this._zoneId;
  }

  /**
   * Setter zoneId
   * @param {string} value
   */
  public set zoneId(value: string) {
    this._zoneId = value;
  }

  /**
   * Getter type
   * @return {string}
   */
  public get type(): string {
    return this._type;
  }

  /**
   * Setter type
   * @param {string} value
   */
  public set type(value: string) {
    this._type = value;
  }

  /**
   * Getter region
   * @return {string}
   */
  public get region(): string {
    return this._region;
  }

  /**
   * Setter region
   * @param {string} value
   */
  public set region(value: string) {
    this._region = value;
  }

  toPlainObj() {
    return {
        username : this._username,
    password : this._password,
    role : this._role,
    status : this._status,
    clientId : this._clientId,
    zoneId : this._zoneId,
    type : this._type,
    region : this._region,
    };
  }
}
