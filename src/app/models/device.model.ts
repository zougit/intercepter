export class Device {
  private _id!: string;
  private _deveui: string;
  private _appk: string;
  private _name: string;
  private _zone: string;
  private _client: string;
  private _type: string;
  private _last_cnx: string;
  private _trame: string;
  private _alarm: string;
  private _item1: string;
  private _item2: string;
  private _item3: string;
  private _item4: string;
  private _model: string;
  private _color: string;
  private _reference: string;
  private _imgPath:string;

	constructor(deveui: string="",appk: string="", name: string="", zone: string="", client: string="", type: string="", model: string="", color: string="", reference: string="", imgPath: string="", last_cnx: string="", trame: string="", alarm: string="", item1: string="", item2: string="", item3: string="", item4: string="") {
		this._deveui = deveui;
		this._appk = appk;
		this._name = name;
		this._zone = zone;
		this._client = client;
		this._type = type;
		this._last_cnx = last_cnx;
		this._trame = trame;
		this._alarm = alarm;
		this._item1 = item1;
		this._item2 = item2;
		this._item3 = item3;
		this._item4 = item4;
		this._model = model;
		this._color = color;
		this._reference = reference;
        this._imgPath = imgPath;
	}


    /**
     * Getter deveui
     * @return {string}
     */
	public get id(): string {
		return this._id;
	}

    /**
     * Setter deveui
     * @param {string} value
     */
	public set id(value: string) {
		this._id = value;
	}

    /**
     * Getter deveui
     * @return {string}
     */
	public get deveui(): string {
		return this._deveui;
	}

    /**
     * Setter deveui
     * @param {string} value
     */
	public set deveui(value: string) {
		this._deveui = value;
	}

    /**
     * Getter appk
     * @return {string}
     */
	public get appk(): string {
		return this._appk;
	}

    /**
     * Setter appk
     * @param {string} value
     */
	public set appk(value: string) {
		this._appk = value;
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
     * Getter zone
     * @return {string}
     */
	public get zone(): string {
		return this._zone;
	}

    /**
     * Setter zone
     * @param {string} value
     */
	public set zone(value: string) {
		this._zone = value;
	}

    /**
     * Getter client
     * @return {string}
     */
	public get client(): string {
		return this._client;
	}

    /**
     * Setter client
     * @param {string} value
     */
	public set client(value: string) {
		this._client = value;
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
     * Getter last_cnx
     * @return {string}
     */
	public get last_cnx(): string {
		return this._last_cnx;
	}

    /**
     * Setter last_cnx
     * @param {string} value
     */
	public set last_cnx(value: string) {
		this._last_cnx = value;
	}

    /**
     * Getter trame
     * @return {string}
     */
	public get trame(): string {
		return this._trame;
	}

    /**
     * Setter trame
     * @param {string} value
     */
	public set trame(value: string) {
		this._trame = value;
	}

    /**
     * Getter alarm
     * @return {string}
     */
	public get alarm(): string {
		return this._alarm;
	}

    /**
     * Setter alarm
     * @param {string} value
     */
	public set alarm(value: string) {
		this._alarm = value;
	}

    /**
     * Getter item1
     * @return {string}
     */
	public get item1(): string {
		return this._item1;
	}

    /**
     * Setter item1
     * @param {string} value
     */
	public set item1(value: string) {
		this._item1 = value;
	}

    /**
     * Getter item2
     * @return {string}
     */
	public get item2(): string {
		return this._item2;
	}

    /**
     * Setter item2
     * @param {string} value
     */
	public set item2(value: string) {
		this._item2 = value;
	}

    /**
     * Getter item3
     * @return {string}
     */
	public get item3(): string {
		return this._item3;
	}

    /**
     * Setter item3
     * @param {string} value
     */
	public set item3(value: string) {
		this._item3 = value;
	}

    /**
     * Getter item4
     * @return {string}
     */
	public get item4(): string {
		return this._item4;
	}

    /**
     * Setter item4
     * @param {string} value
     */
	public set item4(value: string) {
		this._item4 = value;
	}

    /**
     * Getter model
     * @return {string}
     */
	public get model(): string {
		return this._model;
	}

    /**
     * Setter model
     * @param {string} value
     */
	public set model(value: string) {
		this._model = value;
	}

    /**
     * Getter color
     * @return {string}
     */
	public get color(): string {
		return this._color;
	}

    /**
     * Setter color
     * @param {string} value
     */
	public set color(value: string) {
		this._color = value;
	}

    /**
     * Getter reference
     * @return {string}
     */
	public get reference(): string {
		return this._reference;
	}

    /**
     * Setter reference
     * @param {string} value
     */
	public set reference(value: string) {
		this._reference = value;
	}

    /**
     * Getter imgPath
     * @return {string}
     */
	public get imgPath(): string {
		return this._imgPath;
	}

    /**
     * Setter imgPath
     * @param {string} value
     */
	public set imgPath(value: string) {
		this._imgPath = value;
	}

    
    toPlainObj() {
        return {
            deveui : this._deveui,
            appk: this._appk,
            name : this._name,
            zone : this._zone,
            client : this._client,
            type : this._type,
            last_cnx : this._last_cnx,
            trame : this._trame,
            alarm : this._alarm,
            item1 : this._item1,
            item2 : this._item2,
            item3 : this._item3,
            item4 : this._item4,
            model : this._model,
            color : this._color,
            reference : this._reference,
            imgPath : this._imgPath
        }
    }
}
