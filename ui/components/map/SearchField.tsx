import {GeoSearchControl, OpenStreetMapProvider} from 'leaflet-geosearch';
import {useMap} from 'react-leaflet';
import {useEffect} from "react";

export const SearchField = () => {

    // @ts-ignore
    const searchControl = new GeoSearchControl({
        provider: new OpenStreetMapProvider(),
        style: 'bar',
    });

    const map = useMap();
    useEffect(() => {
        map.addControl(searchControl);
        return () => {
            map.removeControl(searchControl)
        };
    }, []);

    return null;
};

