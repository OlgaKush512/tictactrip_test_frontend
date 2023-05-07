import React from 'react';

const Itinerary = () => {
  return (
    <div>
      <div className="css-1tfkpah">
        <div
          //   required=""
          className="MuiInputBase-root MuiInput-root MuiInputBase-colorPrimary MuiInputBase-adornedStart css-1cmiyfg"
        >
          <label
            className="MuiInputAdornment-root MuiInputAdornment-positionStart css-n0vqkc"
            // for="1c5951ee-44b3-4d5a-a0fb-eeef530470b1"
          >
            <span className="notranslate">​</span>
            <p className="MuiTypography-root MuiTypography-body2 css-1tli032">
              Départ :
            </p>
          </label>
          <input
            aria-invalid="true"
            aria-describedby="autocomplete_input_visuallyHiddenLabel "
            // autocomplete="off"
            id="1c5951ee-44b3-4d5a-a0fb-eeef530470b1"
            placeholder="D&#39;où partons-nous ?"
            // required=""
            type="text"
            aria-autocomplete="list"
            aria-expanded="false"
            aria-haspopup="listbox"
            aria-owns="autocomplete-3d0685b2-b4d9-401b-a93e-b6b03dd05488"
            role="combobox"
            className="MuiInputBase-input MuiInput-input MuiInputBase-inputAdornedStart css-1veqchx"
            value=""
          />
        </div>
        <div className="MuiInputBase-root MuiInput-root MuiInputBase-colorPrimary MuiInputBase-adornedStart MuiInputBase-adornedEnd css-9ttl9g">
          <label
            className="MuiInputAdornment-root MuiInputAdornment-positionStart css-n0vqkc"
            // for="4910a9e8-5243-434b-98cb-608ade33f2db"
          >
            <span className="notranslate">​</span>
            <p className="MuiTypography-root MuiTypography-body2 css-1tli032">
              Arrivée :
            </p>
          </label>
          <input
            aria-invalid="false"
            aria-describedby="autocomplete_input_visuallyHiddenLabel "
            // autocomplete="off"
            id="4910a9e8-5243-434b-98cb-608ade33f2db"
            placeholder="Où allons-nous ?"
            type="text"
            aria-autocomplete="list"
            aria-expanded="false"
            aria-haspopup="listbox"
            aria-owns="autocomplete-d60e03c8-7b66-4151-895a-4ddc20d80358"
            role="combobox"
            className="MuiInputBase-input MuiInput-input MuiInputBase-inputAdornedStart MuiInputBase-inputAdornedEnd css-1veqchx"
            value="Paris"
          />
          <div className="MuiInputAdornment-root MuiInputAdornment-positionEnd css-oqttl9">
            <button
              className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeLarge css-gv7szl"
              //   tabindex="0"
              type="button"
              aria-label="Suppression de la valeur saisie"
            >
              <svg
                width="24"
                fill="currentColor"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M19 6.4L17.6 5L12 10.6L6.4 5L5 6.4L10.6 12L5 17.6L6.4 19L12 13.4L17.6 19L19 17.6L13.4 12L19 6.4Z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <hr
          className="MuiDivider-root MuiDivider-fullWidth css-v2fpol"
          aria-hidden="true"
        />
        <button
          className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeLarge css-1d915nr"
          //   tabindex="0"
          type="button"
          aria-label="Intervertir la gare de départ et la gare d’arrivée vide Paris"
        >
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="css-15zf9j"
          >
            <path d="M18.4609 16.8848C18.461 16.9504 18.4481 17.0155 18.423 17.0762C18.3978 17.1368 18.361 17.192 18.3146 17.2384C18.2681 17.2848 18.213 17.3217 18.1523 17.3468C18.0916 17.3719 18.0266 17.3848 17.9609 17.3848H6.89209L10.6538 21.1465C10.701 21.1927 10.7386 21.2479 10.7643 21.3087C10.7901 21.3696 10.8035 21.4349 10.8038 21.501C10.8042 21.5671 10.7914 21.6326 10.7663 21.6937C10.7411 21.7548 10.7041 21.8103 10.6574 21.8571C10.6107 21.9038 10.5552 21.9408 10.494 21.9659C10.4329 21.9911 10.3674 22.0038 10.3014 22.0035C10.2353 22.0032 10.1699 21.9897 10.1091 21.964C10.0482 21.9382 9.99306 21.9007 9.94681 21.8535L5.936 17.8428C5.68226 17.5885 5.53976 17.244 5.53976 16.8848C5.53976 16.5256 5.68226 16.181 5.936 15.9268L9.94678 11.916C10.0409 11.8238 10.1675 11.7725 10.2992 11.7731C10.431 11.7738 10.5571 11.8264 10.6502 11.9196C10.7434 12.0127 10.796 12.1388 10.7967 12.2705C10.7973 12.4023 10.746 12.5289 10.6538 12.623L6.89209 16.3848H17.9609C18.0266 16.3847 18.0916 16.3976 18.1523 16.4228C18.213 16.4479 18.2681 16.4847 18.3146 16.5311C18.361 16.5776 18.3978 16.6327 18.423 16.6934C18.4481 16.7541 18.461 16.8191 18.4609 16.8848ZM6.03906 7.61572H17.1084L13.3462 11.3774C13.299 11.4237 13.2614 11.4788 13.2357 11.5397C13.2099 11.6006 13.1965 11.6659 13.1962 11.732C13.1958 11.7981 13.2086 11.8636 13.2337 11.9247C13.2589 11.9858 13.2959 12.0413 13.3426 12.088C13.3893 12.1348 13.4449 12.1718 13.506 12.1969C13.5671 12.222 13.6326 12.2348 13.6986 12.2345C13.7647 12.2341 13.8301 12.2207 13.8909 12.1949C13.9518 12.1692 14.0069 12.1316 14.0532 12.0844L18.0649 8.0737C18.3183 7.8192 18.4604 7.4747 18.4604 7.1156C18.4603 6.7565 18.3179 6.41207 18.0644 6.1577L14.0532 2.14648C13.9591 2.05429 13.8325 2.00294 13.7008 2.00361C13.569 2.00427 13.4429 2.05689 13.3498 2.15003C13.2566 2.24317 13.204 2.36931 13.2033 2.50103C13.2027 2.63274 13.254 2.7594 13.3462 2.85348L17.1079 6.61568H6.03906C5.90645 6.61568 5.77928 6.66836 5.68551 6.76213C5.59174 6.85589 5.53906 6.98307 5.53906 7.11568C5.53906 7.24829 5.59174 7.37547 5.68551 7.46923C5.77928 7.563 5.90645 7.61568 6.03906 7.61568V7.61572Z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Itinerary;
