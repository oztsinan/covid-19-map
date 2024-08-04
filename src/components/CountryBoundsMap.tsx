"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { TileLayer, TileLayerProps, GeoJSON } from "react-leaflet";
import DynamicMap from "./DynamicMap";
import L from "leaflet";
import geoJsonData from "@/assets/countries.geo.json";
import "leaflet/dist/leaflet.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const CountryBoundsMap = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryCountry = searchParams.get("country");

  const selectedCountry = useRef<string | null>(queryCountry);
  const originalStyles = useRef<{ [key: string]: any }>({});

  const darkModeTileLayerProps: TileLayerProps = {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 20,
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    updateWhenIdle: false,
    updateWhenZooming: false,
  };

  const lightModeTileLayerProps: TileLayerProps = {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 20,
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    updateWhenIdle: false,
    updateWhenZooming: false,
  };

  const maxBounds = L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180));

  const updateCountryStyle = useCallback(() => {
    Object.keys(originalStyles.current).forEach((name) => {
      const { layer, style } = originalStyles.current[name];
      if (name === selectedCountry.current) {
        layer.setStyle({
          fillColor: "#FF0000",
          weight: 2,
          color: "#FF0000",
          fillOpacity: 0.5,
        });
      } else {
        layer.setStyle(style);
      }
    });
  }, []);

  const onEachCountry = useCallback(
    (country: any, layer: any) => {
      const originalStyle = {
        fillColor: layer.options.fillColor,
        weight: layer.options.weight,
        color: layer.options.color,
        fillOpacity: layer.options.fillOpacity,
        opacity: layer.options.opacity,
      };

      originalStyles.current[country.properties.name] = {
        layer,
        style: originalStyle,
      };

      if (country.properties.name === selectedCountry.current) {
        layer.setStyle({
          fillColor: "#FF0000",
          weight: 2,
          color: "#FF0000",
          fillOpacity: 0.5,
        });
      }

      layer.on({
        click: () => {
          selectedCountry.current = country.properties.name;
          updateCountryStyle();
          router.push(`${pathname}?country=${country.properties.name}`);
        },
        mouseover: () => {
          if (country.properties.name !== selectedCountry.current) {
            layer.setStyle({
              opacity: 0.5,
              weight: 2,
              color: "#FF0000",
            });
          }
        },
        mouseout: () => {
          if (country.properties.name !== selectedCountry.current) {
            layer.setStyle(originalStyle);
          }
        },
      });
    },
    [pathname, router, updateCountryStyle]
  );

  useEffect(() => {
    if (queryCountry) {
      selectedCountry.current = queryCountry;
      updateCountryStyle();
    }
  }, [queryCountry, updateCountryStyle]);

  return (
    <DynamicMap
      zoomControl={true}
      center={[40.9610678, 29.1104779]}
      zoom={3}
      minZoom={3}
      maxBounds={maxBounds}
      maxBoundsViscosity={1.0}
    >
      <TileLayer className="light:hidden" {...darkModeTileLayerProps} />
      <TileLayer className="dark:hidden" {...lightModeTileLayerProps} />

      <GeoJSON
        style={{
          color: "var(--border)",
        }}
        data={geoJsonData as any}
        onEachFeature={onEachCountry}
      />
    </DynamicMap>
  );
};

export default CountryBoundsMap;
