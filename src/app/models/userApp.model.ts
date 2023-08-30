export class UserApp {
  private _id!: string;
  private _name: string;
  private _firstname: string;
  private _login: string;
  private _password: string;
  private _zoneId: string;
  private _status: string;
  private _role: string;

  constructor(
    login: string,
    firstname: string,
    name: string,
    password: string,
    role: string,
    status: string,
    zoneId: string,
  ) {
    this._login = login;
    this._firstname = firstname;
    this._name = name;
    this._password = password;
    this._role = role;
    this._status = status;
    this._zoneId = zoneId;
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
   * Setter login
   * @param {string} value
   */
    public set login(value: string) {
        this._login = value;
      }
    
      /**
       * Getter login
       * @return {string}
       */
      public get login(): string {
        return this._login;
      }

  /**
   * Getter login
   * @return {string}
   */
  public get firstname(): string {
    return this._firstname;
  }

  /**
   * Setter login
   * @param {string} value
   */
  public set firstname(value: string) {
    this._firstname = value;
  }

  /**
   * Getter login
   * @return {string}
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Setter login
   * @param {string} value
   */
  public set name(value: string) {
    this._name = value;
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

  toPlainObj() {
    return {
      login: this._login,
      firstname: this._firstname,
      name: this._name,
      password: this._password,
      role: this._role,
      status: this._status,
      zoneId: this._zoneId,
    };
  }
}
