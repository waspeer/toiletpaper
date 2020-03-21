/* eslint-disable max-classes-per-file */
/* eslint-disable camelcase */
declare module 'google-spreadsheet' {
  /**
   * An enumeration of the possible recalculation interval options.
   */

  enum RecalculationInterval {
    /** Default value. This value must not be used. */
    RECALCULATION_INTERVAL_UNSPECIFIED = 'RECALCULATION_INTERVAL_UNSPECIFIED',

    /** Volatile functions are updated on every change. */
    ON_CHANGE = 'ON_CHANGE',

    /** Volatile functions are updated on every change and every minute. */
    MINUTE = 'MINUTE',

    /** Volatile functions are updated on every change and hourly. */
    HOUR = 'HOUR',
  }

  /**
   * The number format of the cell.
   * In this documentation the locale is assumed to be en_US, but the actual format depends on the locale of the spreadsheet.
   */

  enum NumberFormatType {
    /** The number format is not specified and is based on the contents of the cell. Do not explicitly use this. */
    NUMBER_FORMAT_TYPE_UNSPECIFIED = 'NUMBER_FORMAT_TYPE_UNSPECIFIED',

    /** Text formatting, e.g 1000.12 */
    TEXT = 'TEXT',

    /** Number formatting, e.g, 1,000.12 */
    NUMBER = 'NUMBER',

    /** Percent formatting, e.g 10.12% */
    PERCENT = 'PERCENT',

    /** Currency formatting, e.g $1,000.12 */
    CURRENCY = 'CURRENCY',

    /** Date formatting, e.g 9/26/2008 */
    DATE = 'DATE',

    /** Time formatting, e.g 3:59:00 PM */
    TIME = 'TIME',

    /** Date+Time formatting, e.g 9/26/08 15:59:00 */
    DATE_TIME = 'DATE_TIME',

    /** Scientific number formatting, e.g 1.01E+03  */
    SCIENTIFIC = 'SCIENTIFIC',
  }

  /**
   * The number format of a cell.
   */

  interface NumberFormat {
    /** The type of the number format. When writing, this field must be set.  */
    type: NumberFormatType;

    /**
     * Pattern string used for formatting. If not set, a default pattern
     * based on the user's locale will be used if necessary for the given
     * type. See the Date and Number Formats guide for more information
     * about the supported patterns.
     * */
    pattern: string;
  }

  /**
   * Represents a color in the RGBA color space.
   */

  interface Color {
    /** The amount of red in the color as a value in the interval [0, 1].  */
    red: number;

    /** The amount of green in the color as a value in the interval [0, 1].  */
    green: number;

    /** The amount of blue in the color as a value in the interval [0, 1].  */
    blue: number;

    /**
     * The fraction of this color that should be applied to the pixel. That is,
     * the final pixel color is defined by the equation:
     *  pixel color = alpha * (this color) + (1.0 - alpha) * (background color)
     *
     * This means that a value of 1.0 corresponds to a solid color, whereas a
     * value of 0.0 corresponds to a completely transparent color. This uses a
     * wrapper message rather than a simple float scalar so that it is possible
     * to distinguish between a default value and the value being unset. If
     * omitted, this color object is to be rendered as a solid color (as if the
     * alpha value had been explicitly given with a value of 1.0).
     */
    alpha: number;
  }

  /**
   * Theme color types.
   */
  enum ThemeColorType {
    /** Unspecified theme color */
    THEME_COLOR_TYPE_UNSPECIFIED = 'THEME_COLOR_TYPE_UNSPECIFIED',

    /** Represents the primary text color */
    TEXT = 'TEXT',

    /** Represents the primary background color */
    BACKGROUND = 'BACKGROUND',

    /** Represents the first accent color */
    ACCENT1 = 'ACCENT1',

    /** Represents the second accent color */
    ACCENT2 = 'ACCENT2',

    /** Represents the third accent color */
    ACCENT3 = 'ACCENT3',

    /** Represents the fourth accent color */
    ACCENT4 = 'ACCENT4',

    /** Represents the fifth accent color */
    ACCENT5 = 'ACCENT5',

    /** Represents the sixth accent color */
    ACCENT6 = 'ACCENT6',

    /** Represents the color to use for hyperlinks  */
    LINK = 'LINK',
  }

  /**
   * A color value.
   */

  interface ColorStyle {
    /** RGB color.  */
    rgbColor: Color;

    /** Theme color.  */
    themeColor: ThemeColorType;
  }

  /** The style of a border.  */
  enum Style {
    /** The style is not specified. Do not use this. */
    STYLE_UNSPECIFIED = 'STYLE_UNSPECIFIED',

    /** The border is dotted. */
    DOTTED = 'DOTTED',

    /** The border is dashed. */
    DASHED = 'DASHED',

    /** The border is a thin solid line. */
    SOLID = 'SOLID',

    /** The border is a medium solid line. */
    SOLID_MEDIUM = 'SOLID_MEDIUM',

    /** The border is a thick solid line. */
    SOLID_THICK = 'SOLID_THICK',

    /** No border. Used only when updating a border in order to erase it. */
    NONE = 'NONE',

    /** The border is two solid lines.  */
    DOUBLE = 'DOUBLE',
  }

  /**
   * A border along a cell.
   */

  interface Border {
    /** The style of the border.  */
    style: Style;

    /** The width of the border, in pixels. DEPRECATED; the width is determined by the "style" field.  */
    width: number;

    /** The color of the border.  */
    color: Color;

    /** The color of the border. If color is also set, this field takes precedence.  */
    colorStyle: ColorStyle;
  }

  /**
   * The borders of the cell.
   */

  interface Borders {
    /** The top border of the cell.  */
    top: Borders;

    /** The bottom border of the cell.  */
    bottom: Borders;

    /** The left border of the cell.  */
    left: Borders;

    /** The right border of the cell.  */
    right: Borders;
  }

  /**
   * The amount of padding around the cell, in pixels. When updating padding, every field must be specified.
   */

  interface Padding {
    /** The top padding of the cell. */
    top: number;

    /** The right padding of the cell. */
    right: number;

    /** The bottom padding of the cell. */
    bottom: number;

    /** The left padding of the cell. */
    left: number;
  }

  /**
   * The horizontal alignment of text in a cell.
   */

  enum HorizontalAlign {
    /** The horizontal alignment is not specified. Do not use this. */
    HORIZONTAL_ALIGN_UNSPECIFIED = 'HORIZONTAL_ALIGN_UNSPECIFIED',

    /** The text is explicitly aligned to the left of the cell. */
    LEFT = 'LEFT',

    /** The text is explicitly aligned to the center of the cell. */
    CENTER = 'CENTER',

    /** The text is explicitly aligned to the right of the cell.  */
    RIGHT = 'RIGHT',
  }

  /**
   * The vertical alignment of text in a cell.
   */

  enum VerticalAlign {
    /** The vertical alignment is not specified. Do not use this. */
    VERTICAL_ALIGN_UNSPECIFIED = 'VERTICAL_ALIGN_UNSPECIFIED',

    /** The text is explicitly aligned to the top of the cell. */
    TOP = 'TOP',

    /** The text is explicitly aligned to the middle of the cell. */
    MIDDLE = 'MIDDLE',

    /** The text is explicitly aligned to the bottom of the cell.  */
    BOTTOM = 'BOTTOM',
  }

  /**
   * How to wrap text in a cell.
   */

  enum WrapStrategy {
    /** The default value, do not use. */
    WRAP_STRATEGY_UNSPECIFIED = 'WRAP_STRATEGY_UNSPECIFIED',

    /** Lines that are longer than the cell width will be written in the next cell over, so long as that cell is empty. If the next cell over is non-empty, this behaves the same as CLIP . The text will never wrap to the next line unless the user manually inserts a new line. */
    OVERFLOW_CELL = 'OVERFLOW_CELL',

    /** This wrap strategy represents the old Google Sheets wrap strategy where words that are longer than a line are clipped rather than broken. This strategy is not supported on all platforms and is being phased out. */
    LEGACY_WRAP = 'LEGACY_WRAP',

    /** Lines that are longer than the cell width will be clipped. The text will never wrap to the next line unless the user manually inserts a new line. */
    CLIP = 'CLIP',

    /** Words that are longer than a line are wrapped at the character level rather than clipped. */
    WRAP = 'WRAP',
  }

  /**
   * The direction of text in a cell.
   */

  enum TextDirection {
    /** The text direction is not specified. Do not use this. */
    TEXT_DIRECTION_UNSPECIFIED = 'TEXT_DIRECTION_UNSPECIFIED',

    /** The text direction of left-to-right was set by the user. */
    LEFT_TO_RIGHT = 'LEFT_TO_RIGHT',

    /** The text direction of right-to-left was set by the user.  */
    RIGHT_TO_LEFT = 'RIGHT_TO_LEFT',
  }

  /**
   * The format of a run of text in a cell. Absent values indicate that the field isn't specified.
   */

  interface TextFormat {
    /** The foreground color of the text. */
    foregroundColor: Color;

    /** The foreground color of the text. If foregroundColor is also set, this field takes precedence. */
    foregroundColorStyle: ColorStyle;

    /** The font family. */
    fontFamily: string;

    /** The size of the font. */
    fontSize: number;

    /** True if the text is bold. */
    bold: boolean;

    /** True if the text is italicized. */
    italic: boolean;

    /** True if the text has a strikethrough. */
    strikethrough: boolean;

    /** True if the text is underlined.  */
    underline: boolean;
  }

  /**
   * Whether to explicitly render a hyperlink. If not specified, the hyperlink is linked.
   */

  enum HyperlinkDisplayType {
    /** The default value: the hyperlink is rendered. Do not use this. */
    HYPERLINK_DISPLAY_TYPE_UNSPECIFIED = 'HYPERLINK_DISPLAY_TYPE_UNSPECIFIED',

    /** A hyperlink should be explicitly rendered. */
    LINKED = 'LINKED',

    /** A hyperlink should not be rendered.  */
    PLAIN_TEXT = 'PLAIN_TEXT',
  }

  /** The rotation applied to text in a cell. */

  interface TextRotation {
    /**
     * The angle between the standard orientation and the desired orientation.
     * Measured in degrees. Valid values are between -90 and 90.
     * Positive angles are angled upwards, negative are angled downwards.
     */
    angle: number;

    /** If true, text reads top to bottom, but the orientation of individual characters is unchanged. */
    vertical: boolean;
  }

  /**
   * The format of a cell.
   */

  interface CellFormat {
    /** A format describing how number values should be represented to the user.  */
    numberFormat: NumberFormat;

    /** The background color of the cell.  */
    backgroundColor: Color;

    /** The background color of the cell. If backgroundColor is also set, this field takes precedence.  */
    backgroundColorStyle: ColorStyle;

    /** The borders of the cell.  */
    borders: Borders;

    /** The padding of the cell.  */
    padding: Padding;

    /** The horizontal alignment of the value in the cell.  */
    horizontalAlignment: HorizontalAlign;

    /** The vertical alignment of the value in the cell. */
    verticalAlignment: VerticalAlign;

    /** The wrap strategy for the value in the cell.  */
    wrapStrategy: WrapStrategy;

    /** The direction of the text in the cell.  */
    textDirection: TextDirection;

    /** The format of the text in the cell (unless overridden by a format run).  */
    textFormat: TextFormat;

    /** How a hyperlink, if it exists, should be displayed in the cell. */
    hyperlinkDisplayType: HyperlinkDisplayType;

    /** The rotation applied to text in a cell  */
    textRotation: TextRotation;
  }

  /**
   * A pair mapping a spreadsheet theme color type to the concrete color it represents.
   */

  interface ThemeColorPair {
    /** The type of the spreadsheet theme color. */
    colorType: ThemeColorType;

    /** The concrete color corresponding to the theme color type. */
    color: ColorStyle;
  }

  /**
   * Settings to control how circular dependencies are resolved with iterative calculation.
   */

  interface IterativeCalculationSettings {
    /** When iterative calculation is enabled, the maximum number of calculation rounds to perform. */
    maxIterations: number;

    /** When iterative calculation is enabled and successive results differ by less than this threshold value, the calculation rounds stop. */
    convergenceThreshold: number;
  }

  /**
   * Represents spreadsheet theme
   */

  interface SpreadsheetTheme {
    /** Name of the primary font family. */
    primaryFontFamily: string;

    /** The spreadsheet theme color pairs. To update you must provide all theme color pairs. */
    themeColors: ThemeColorPair[];
  }

  /**
   * Object containing credendtials from google for your service account
   */

  interface ServiceAccountCredentials {
    /** The email of your service account */
    client_email: string;

    /** The private key for your service account */
    private_key: string;
  }

  interface DocumentProperties {
    /**
     * Document title
     */
    title: string;

    /**
     * Document locale/language
     * ISO code - ex: "en", "en_US"
     */
    locale: string;

    /**
     * Document timezone
     * CLDR format - ex: "America/New_York", "GMT-07:00"
     */
    timeZone: string;

    /**
     * See RecalculationInterval
     */
    autoRecalc: RecalculationInterval;

    /**
     * See CellFormat
     */
    defaultFormat: CellFormat;

    /**
     * See SpreadsheetTheme
     */
    spreadsheetTheme: SpreadsheetTheme;

    /**
     * See IterativeCalculationSettings
     */
    iterativeCalculationSettings: IterativeCalculationSettings;
  }

  /**
   * A range on a sheet.
   */

  interface GridRange {
    /** The sheet this range is on.  */
    sheetId: number;

    /** The start row (inclusive) of the range, or not set if unbounded. */
    startRowIndex: number;

    /** The end row (exclusive) of the range, or not set if unbounded. */
    endRowIndex: number;

    /** The start column (inclusive) of the range, or not set if unbounded. */
    startColumnIndex: number;

    /** The end column (exclusive) of the range, or not set if unbounded. */
    endColumnIndex: number;
  }

  class GoogleSpreadsheet {
    constructor(sheetId: string);

    /**
     * Document ID
     * set during initialization, not editable
     */
    readonly spreadsheetId: string;

    /**
     * Document title
     */
    readonly title: string;

    /**
     * Document locale/language
     * ISO code - ex: "en", "en_US"
     */
    readonly locale: string;

    /**
     * Document timezone
     * CLDR format - ex: "America/New_York", "GMT-07:00"
     */
    readonly timeZone: string;

    /**
     * See RecalculationInterval
     */
    readonly autoRecalc: RecalculationInterval;

    /**
     * See CellFormat
     */
    readonly defaultFormat: CellFormat;

    /**
     * See SpreadsheetTheme
     */
    readonly spreadsheetTheme: SpreadsheetTheme;

    /**
     * See IterativeCalculationSettings
     */
    readonly iterativeCalculationSettings: IterativeCalculationSettings;

    /**
     * Child worksheets, keyed by their `sheetId`
     */
    readonly sheetsById: Record<string, GoogleSpreadsheetWorksheet>;

    /**
     * Array of sheets, ordered by their index
     * This is the order they appear in the Google sheets UI
     */
    readonly sheetsByIndex: GoogleSpreadsheetWorksheet[];

    /**
     * Count of child worksheets
     * Same as doc.sheetsByIndex.length
     */
    readonly sheetCount: number;

    /**
     * Initialize JWT-style auth for google service account
     *
     * @param {ServiceAccountCredentials} creds Object containing credendtials from google for your service account
     */
    useServiceAccountAuth(creds: ServiceAccountCredentials): Promise<void>;

    /**
     * Set API-key to use for auth - only allows read-only access to public docs
     *
     * @param {string} key API key for your google project
     */
    useApiKey(key: string): Promise<void>;

    /**
     * Set token to use for auth - managed elsewhere
     *
     * @param {string} token Oauth token to use
     */
    useRawAccessToken(token: string): Promise<void>;

    /**
     * Load basic document props and child sheets
     */
    loadInfo(): Promise<void>;

    /**
     * Update basic document properties
     *
     * @param {DocumentProperties} props Object of all sheet properties
     */
    updateProperties(props: Partial<DocumentProperties>): Promise<void>;

    /**
     * Clear local cache of properties and sheets
     */
    resetLocalCache(): void;

    /**
     * Add a new worksheet to the document
     *
     * @param props Object of all sheet properties
     */
    addSheet(props?: Partial<SheetProperties>): Promise<GoogleSpreadsheetWorksheet>;

    /**
     * Delete a worksheet from the document
     *
     * @param {string} sheetId ID of the sheet to remove
     */
    deleteSheet(sheetId: string): Promise<void>;

    /**
     * Add a new named range to the document
     *
     * @param {string} name Name of the range; used in formulas to refer to it
     * @param {string|GridRange} range A1 range or GridRange object
     * @param {string} [rangeId] ID to use; autogenerated by google if empty
     */
    addNamedRange(name: string, range: string | GridRange, rangeId?: string): Promise<void>;

    /**
     * Delete a named range from the document
     *
     * @param rangeId ID of the range to remove
     */
    deleteNamedRange(rangeId: string): Promise<void>;
  }

  /**
   * The kind of sheet.
   */

  enum SheetType {
    /** Default value, do not use. */
    SHEET_TYPE_UNSPECIFIED = 'SHEET_TYPE_UNSPECIFIED',

    /** The sheet is a grid. */
    GRID = 'GRID',

    /** The sheet has no grid and instead has an object like a chart or image.  */
    OBJECT = 'OBJECT',
  }

  interface GridProperties {
    /** The number of rows in the grid. */
    rowCount: number;

    /** The number of columns in the grid. */
    columnCount: number;

    /** The number of rows that are frozen in the grid. */
    frozenRowCount: number;

    /** The number of columns that are frozen in the grid. */
    frozenColumnCount: number;

    /** True if the grid isn't showing gridlines in the UI. */
    hideGridlines: boolean;

    /** True if the row grouping control toggle is shown after the group. */
    rowGroupControlAfter: boolean;

    /** True if the column grouping control toggle is shown after the group.  */
    columnGroupControlAfter: boolean;
  }

  /**
   * Stats about cells in the sheet
   */

  interface CellStats {
    /** int >= 0; Total number of cells in the sheet; should equal rowCount * columnCount */
    total: number;

    /** int >= 0; Number of cells that are loaded locally */
    loaded: number;

    /** int >= 0; Number of loaded cells that are not empty */
    nonEmpty: number;
  }

  /**
   * Inserting options
   */

  interface InsertOptions {
    /** Store raw values instead of converting as if typed into the sheets UI */
    raw?: boolean;

    /** Insert new rows instead of overwriting empty rows and only adding if necessary */
    insert?: boolean;
  }

  /**
   * @todo
   * Object of cell values, keys are based on the header row or Array of cell values in order from first column onwards
   */

  type RowValues = any | string[];

  /**
   * Basic properties about the sheet are available once the sheet is loaded from the doc.loadInfo() call.
   */
  interface SheetProperties {
    /** The name of the sheet */
    title: string;

    /** The index of the sheet within the spreadsheet */
    index: number;

    /** Additional properties of the sheet if this sheet is a grid */
    gridProperties: GridProperties;

    /** True if the sheet is hidden in the UI, false if it's visible */
    hidden: boolean;

    /** The color of the tab in the UI */
    tabColor: Color;

    /** True if the sheet is an RTL sheet instead of an LTR sheet */
    rightToLeft: boolean;
  }

  interface SheetGridProperties {
    /** int > 1;	Number of rows in the sheet */
    rowCount: number;

    /** int > 1; Number of columns in the sheet */
    columnCount: number;

    /** Stats about cells in the sheet */
    cellStats: CellStats;
  }

  /**
   * Properties about a dimension
   */

  interface DimensionProperties {
    /** True if this dimension is explicitly hidden.  */
    hiddenByUser: boolean;

    /** The height (if a row) or width (if a column) of the dimension in pixels.  */
    pixelSize: number;

    /** The developer metadata associated with a single row or column.  */
    developerMetadata: any;
  }

  class GoogleSpreadsheetWorksheet {
    private constructor();

    /** Sheet ID; set during creation, not editable */
    readonly sheetId: string;

    /** The name of the sheet */
    readonly title: string;

    /** The index of the sheet within the spreadsheet */
    readonly index: number;

    /** The type of sheet; set during creation, not editable */
    readonly sheetType: SheetType;

    /** Additional properties of the sheet if this sheet is a grid */
    readonly gridProperties: GridProperties;

    /** True if the sheet is hidden in the UI, false if it's visible */
    readonly hidden: boolean;

    /** The color of the tab in the UI */
    readonly tabColor: Color;

    /** True if the sheet is an RTL sheet instead of an LTR sheet */
    readonly rightToLeft: boolean;

    /** int > 1;	Number of rows in the sheet */
    readonly rowCount: number;

    /** int > 1; Number of columns in the sheet */
    readonly columnCount: number;

    /** Stats about cells in the sheet */
    readonly cellStats: CellStats;

    /** Loads the header row (first row) of the sheet usually do not need to call this directly */
    loadHeaderRow(): Promise<void>;

    /**
     * Set the header row (first row) of the sheet
     *
     * @param {string[]} headerValues Array of strings to set as cell values in first row
     */
    setHeaderRow(headerValues: string[]): Promise<void>;

    /**
     * Append a new row to the sheet
     *
     * @param {object|string[]} rowValues Object of cell values, keys are based on the header row or Array of cell values in order from first column onwards
     * @param {InsertOptions} [options] Options object
     */
    addRow(rowValues: RowValues, options?: InsertOptions): Promise<GoogleSpreadsheetRow>;

    /**
     * Append multiple new rows to the sheet at once
     *
     * @param {RowValues[]} arrayOfRowValues Array of rows values to append to the sheet
     * @param {InsertOptions} [options] Inserting options
     */
    addRows(
      arrayOfRowValues: RowValues[],
      options?: InsertOptions,
    ): Promise<GoogleSpreadsheetRow[]>;

    /**
     * Fetch rows from the sheet
     *
     * @param [options] Options object
     * @param {number} [options.offset] How many rows to skip from the top
     * @param {number} [options.limit] Max number of rows to fetch
     */
    getRows<T extends Record<string, any> = {}>(options?: {
      offset: number;
      limit: number;
    }): Promise<(GoogleSpreadsheetRow & T)[]>;

    /**
     * Fetch cells from google
     *
     * @param filters Can be a single filter or array of filters
     */
    loadCells(filters?: any): Promise<any>;

    /**
     * Retrieve a cell from the cache based on zero-indexed row/column
     *
     * @param rowIndex Row of the cell
     * @param columnIndex Column of the cell to retrieve
     */
    getCell(rowIndex: number, columnIndex: number): GoogleSpreadsheetCell;

    /**
     * Retrieve a cell from the cache based on A1 address
     *
     * @param a1Address Address of the cell
     */
    getCellByA1(a1Address: string): GoogleSpreadsheetCell;

    /**
     * Saves all cells in the sheet that have unsaved changes
     */
    saveUpdatedCells(): Promise<void>;

    /**
     * Saves specific cells
     *
     * @param cells Array of cells to save
     */
    saveCells(cells: GoogleSpreadsheetCell[]): Promise<void>;

    /**
     * Reset local cache of properties and cell data
     *
     * @param dataOnly If true, only affects data, not properties
     */
    resetLocalCache(dataOnly?: boolean): void;

    /**
     * Update basic sheet properties
     *
     * @param props Properties to update
     */
    updateProperties(props: Partial<SheetProperties>): Promise<void>;

    /**
     * Update grid properties / dimensions
     *
     * @param props Properties to update
     */
    resize(props: Partial<SheetGridProperties>): Promise<void>;

    /**
     * Update sheet "dimension properties"
     *
     * @param columnsOrRows Which dimension
     * @param props properties to update
     * @param [bounds]
     */
    updateDimensionProperties(
      columnsOrRows: 'COLUMNS' | 'ROWS',
      props: DimensionProperties,
      bounds?: { startIndex: number; endIndex: number },
    ): void;

    /**
     * Clear all data/cells in the sheet
     */
    clear(): Promise<void>;

    /**
     * Delete this sheet
     */
    delete(): Promise<void>;

    /**
     * Copy this sheet to another document
     *
     * @param destinationSpreadsheetId ID of another spreadsheet document
     */
    copyToSpreadsheet(destinationSpreadsheetId: string): Promise<void>;
  }

  class GoogleSpreadsheetRow {
    private constructor();

    /** int >= 1; A1 row number in the sheet of this row */
    readonly rowNumber: number;

    /** Full A1 range of this row, including the sheet name; Ex: "sheet1!A5:D5" */
    readonly a1Range: string;

    /**
     * Save any updates made to row values
     *
     * @param options Store raw values instead of converting as if typed into the sheets UI
     */
    save(options?: { raw: boolean }): Promise<void>;

    /**
     * Delete this row
     */
    delete(): Promise<void>;
  }

  export { GoogleSpreadsheet, GoogleSpreadsheetWorksheet, GoogleSpreadsheetRow };
}
