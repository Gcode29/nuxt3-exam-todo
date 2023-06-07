<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" class="bg-blue">
      <div>
        <v-container>
          <h1 class="text-center">Search Location</h1>
          <div class="mt-2">
            <v-row>
              <v-col cols="12">
                <v-autocomplete
                  label="Region"
                  :items="[
                    'California',
                    'Colorado',
                    'Florida',
                    'Georgia',
                    'Texas',
                    'Wyoming',
                  ]"
                  variant="outlined"
                ></v-autocomplete>
              </v-col>
              <!--  -->
              <v-col cols="12">
                <v-autocomplete
                  label="Province"
                  :items="[
                    'California',
                    'Colorado',
                    'Florida',
                    'Georgia',
                    'Texas',
                    'Wyoming',
                  ]"
                  variant="outlined"
                ></v-autocomplete>
              </v-col>
              <!--  -->
              <v-col cols="12">
                <v-autocomplete
                  label="City"
                  :items="[
                    'California',
                    'Colorado',
                    'Florida',
                    'Georgia',
                    'Texas',
                    'Wyoming',
                  ]"
                  variant="outlined"
                ></v-autocomplete>
              </v-col>
            </v-row>
            <!--  -->
            <h4 class="ml-4">Lot Area (SQM)</h4>
            <v-row class="mt-3">
              <v-col cols="12" md="6">
                <v-text-field
                  label="Min"
                  :items="[
                    'California',
                    'Colorado',
                    'Florida',
                    'Georgia',
                    'Texas',
                    'Wyoming',
                  ]"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Max"
                  :items="[
                    'California',
                    'Colorado',
                    'Florida',
                    'Georgia',
                    'Texas',
                    'Wyoming',
                  ]"
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
        </v-container>
      </div>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer">
        <v-icon class="text-blue">mdi-magnify</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="font-weight-bold text-blue"
        >Buyaland</v-toolbar-title
      >
      <v-tooltip text="Contact Us">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            color="blue"
            variant="text"
            icon="mdi-phone"
          ></v-btn>
        </template>
      </v-tooltip>

      <v-btn icon @click="loginModal = !loginModal">
        <v-icon color="blue">mdi-account</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <div id="map" class="map-container"></div>
    </v-main>

    <v-dialog v-model="loginModal" persistent width="500">
      <v-card>
        <v-toolbar color="blue" title="Buyaland" class="mb-4"
          ><v-btn icon dark @click="loginModal = false">
            <v-icon>mdi-close</v-icon>
          </v-btn></v-toolbar
        >
        <div class="mr-3 ml-3 mt-3">
          <v-text-field
            placeholder="Email"
            rounded
            variant="outlined"
          ></v-text-field>

          <v-text-field
            placeholder="Password"
            rounded
            variant="outlined"
          ></v-text-field>
        </div>
        <v-card-actions class="mb-4">
          <v-btn
            class="bg-blue text-white"
            variant="text"
            @click="loginModal = false"
            block
          >
            Login
          </v-btn>
        </v-card-actions>

        <span class="text-center mr-5 mb-4">
          Don't have an Account ?
          <a href="#">Sign up</a>
        </span>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<style>
.map-container {
  height: calc(100vh - 64px); /* Adjust the navbar height here if necessary */
  width: 100%;
}
</style>

<script setup>
import { ref, onMounted } from "vue";

const drawer = ref(false);
const loginModal = ref(null);

onMounted(() => {
  // Load the OpenLayers script dynamically
  const script = document.createElement("script");
  script.src = "https://www.openlayers.org/api/OpenLayers.js";
  script.async = true;
  script.onload = () => {
    // Initialize the map
    const map = new OpenLayers.Map("map");
    const layer = new OpenLayers.Layer.OSM();
    map.addLayer(layer);
    map.zoomToMaxExtent();

    // Center the map view on the Philippines
    const lonLat = new OpenLayers.LonLat(122.9827, 13.0324).transform(
      new OpenLayers.Projection("EPSG:4326"), // from WGS 1984 projection
      map.getProjectionObject() // to Spherical Mercator projection
    );
    const zoom = 6;
    map.setCenter(lonLat, zoom);
  };

  document.head.appendChild(script);
});
</script>
