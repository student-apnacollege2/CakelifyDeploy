import React, { useEffect, useState } from "react";
import { countries } from "countries-list";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../redux/features/cartSlice";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import "./Cart.css";

const Shipping = () => {
  const countriesList = Object.values(countries);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [country, setCountry] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const { shippingInfo } = useSelector((state) => state.cart);
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    if (shippingInfo) {
      setAddress(shippingInfo?.address);
      setCity(shippingInfo?.city);
      setZipCode(shippingInfo?.zipCode);
      setPhoneNo(shippingInfo?.phoneNo);
      setCountry(shippingInfo?.country);
      setLatitude(shippingInfo?.latitude);
      setLongitude(shippingInfo?.longitude);
    }
  }, [shippingInfo]);

  const submiHandler = (e) => {
    e.preventDefault();

    dispatch(
      saveShippingInfo({
        address,
        city,
        phoneNo,
        zipCode,
        country,
        latitude,
        longitude,
      })
    );
    navigate("/confirm_order");
  };

  return (
    <>
      <MetaData title={"Shipping Info"} />

      <div className="row wrapper mb-5">
        <div className="col-10 col-lg-5">
          <form className="shadow rounded bg-body" onSubmit={submiHandler}>
            <h2 className="mb-4 mt-24">Shipping Info</h2>
            <div className="mb-3">
              <label htmlFor="address_field" className="form-label">
                Address
              </label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="city_field" className="form-label">
                City
              </label>
              <input
                type="text"
                id="city_field"
                className="form-control"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone_field" className="form-label">
                Phone No
              </label>
              <input
                type="tel"
                id="phone_field"
                className="form-control"
                name="phoneNo"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="zip_code_field" className="form-label">
                Pin Code
              </label>
              <input
                type="number"
                id="zip_code_field"
                className="form-control"
                name="zipCode"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
              />
            </div>
            <button
              onClick={getLocation}
              className="border-3 p-2 mb-2 bg-blue-500 text-white rounded-lg buttonBG"
            >
              Get My Location 📌
            </button>
            <div className="mb-3">
              <label htmlFor="zip_code_field" className="form-label">
                Latitude
              </label>
              <input
                type="string"
                id="zip_code_field"
                className="form-control"
                name="latitude"
                value={latitude}
                onChange={(e) => setZipCode(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="zip_code_field" className="form-label">
                Longitude
              </label>
              <input
                type="string"
                id="zip_code_field"
                className="form-control"
                name="longitude"
                value={longitude}
                onChange={(e) => setZipCode(e.target.value)}
                required
              />
            </div>
            <div>{latitude && longitude && <div></div>}</div>

            <div className="mb-3">
              <label htmlFor="country_field" className="form-label">
                Country
              </label>
              <select
                id="country_field"
                className="form-select"
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                {countriesList?.map((country) => (
                  <option key={country?.name} value={country?.name}>
                    {country?.name}
                  </option>
                ))}
              </select>
            </div>

            <button id="shipping_btn" type="submit" className="btn w-100 py-2">
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
