import 'leaflet/dist/leaflet.css'
import 'leaflet-geosearch/assets/css/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import './Map.css'
import {FeatureGroup, LayersControl, MapContainer, WMSTileLayer, GeoJSON, Popup} from "react-leaflet";
import {CRS, LatLngTuple, LeafletEvent} from "leaflet";
import {SearchField} from "./SearchField.tsx";
import {EditControl} from 'react-leaflet-draw';
import axios from "axios";
import {useEffect, useState} from "react";
import FeatureForm from "./FeatureForm.tsx";
import {FeatureCollection, Feature, Point, LineString, Polygon, Geometry} from "geojson";

function Map() {

    const position: LatLngTuple = [42.390642, -72.5284]
    const [geojson, setGeojson] = useState({"type": "FeatureCollection", "features": []} as FeatureCollection)
    const [name, setName] = useState("")
    const [geometry, setGeom] = useState(null)
    const [isOpen, setOpen] = useState(false);
    const [selectedFeature, setSelectedFeature] = useState({
        "type": "Feature", "geometry": {"coordinates": []}
    } as unknown as Feature<Point | LineString | Polygon>);
    const [latlng, setLatLng] = useState(undefined as LatLngTuple | undefined);

    // const map = useMap();
    const handleCreated = async (e: { layerType: any; layer: any; }) => {
        const {layerType, layer} = e;

        if (layerType === 'polygon') {
            // Handle the created polygon
            console.log('Polygon created:', layer.getLatLngs());
        }

        setGeom(layer.toGeoJSON().geometry);
        setOpen(true);
    };

    const submitForm = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        await axios.post('/api/features/', {name, geometry})
        setOpen(false);
    }

    const updateFeatures = (geojson: FeatureCollection) => {
        setGeojson(geojson)
    }

    useEffect(() => {
        // needs to be updated to support pagination.
        axios.get('/api/features/').then(response => {
            if (response?.data?.results) {
                updateFeatures(response.data.results)
            }
        })
    }, [])

    // {
    //     sourceTarget: { feature: Feature<Point | LineString | Polygon> },
    //     latlng: LatLngTuple
    // }
    const onFeatureClick = (event: LeafletEvent & { latlng: LatLngTuple }) => {
        if (event?.sourceTarget?.feature) {
            setSelectedFeature(event.sourceTarget?.feature)
            setLatLng(event.latlng)
        }
    };


    return (
        <div className="map-div">
            <MapContainer style={{height: '100%', width: '100%'}} crs={CRS.EPSG4326} center={position} zoom={10}
                          scrollWheelZoom={true}>
                <SearchField/>

                <LayersControl position="topright">
                    <LayersControl.BaseLayer checked name="Imagery">
                        <WMSTileLayer
                            attribution='USGS'
                            url='https://basemap.nationalmap.gov:443/arcgis/services/USGSImageryOnly/MapServer/WmsServer'
                            format='image/png'
                            layers='0'
                            version='1.3.0'
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Topo">
                        <WMSTileLayer
                            attribution='USGS'
                            url='https://basemap.nationalmap.gov/arcgis/services/USGSTopo/MapServer/WMSServer'
                            format='image/png'
                            layers='0'
                            version='1.3.0'
                        />
                    </LayersControl.BaseLayer>
                    <FeatureGroup>
                        <EditControl
                            position="topright"
                            onCreated={handleCreated}
                            draw={{
                                rectangle: false,
                                marker: false,
                                circle: false,
                                circlemarker: false,
                            }}
                        />
                    </FeatureGroup>
                </LayersControl>
                {geojson.features.length && <GeoJSON data={geojson} onEachFeature={(_feature, layer) => {
                    // @ts-ignore
                    layer.on('click', onFeatureClick);
                }}/>}
                {selectedFeature && selectedFeature?.geometry?.coordinates?.length && selectedFeature?.properties?.name && (
                    <Popup position={latlng}>
                        <div>
                            <h3>{selectedFeature?.properties?.name}</h3>
                        </div>
                    </Popup>
                )}

            </MapContainer>
            <FeatureForm isOpen={isOpen} setName={setName} submitForm={submitForm}/>
        </div>
    )
}

export default Map
