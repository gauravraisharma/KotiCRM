export interface Timezone {
    zoneName: string;
    gmtOffset: number;
    gmtOffsetName: string;
    abbreviation: string;
    tzName: string;
}

export interface Translation {
    kr?: string;
    "pt-BR"?: string;
    pt?: string;
    nl?: string;
    hr?: string;
    fa?: string;
    de?: string;
    es?: string;
    fr?: string;
    ja?: string;
    it?: string;
    cn?: string;
    tr?: string;
}

export interface State {
    id: number;
    name: string;
    state_code: string;
    latitude: string | null;
    longitude: string | null;
    type: string | null;
}

export interface Country {
    name: string;
    iso3: string;
    iso2: string;
    numeric_code: string;
    phone_code: string;
    capital: string;
    currency: string;
    currency_name: string;
    currency_symbol: string;
    tld: string;
    native: string | null;
    region: string;
    region_id: string | null;
    subregion: string;
    subregion_id: string | null;
    nationality: string;
    timezones: Timezone[] | null;
    translations: Translation;
    latitude: string;
    longitude: string;
    emoji: string;
    emojiU: string;
    states: State[];
}
// export interface Currency{
    

// }