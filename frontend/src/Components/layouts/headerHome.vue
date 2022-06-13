<script>
export default {
  name: "headerHome",
};
</script>

<template>
  <nav
    class="navbar navbar-expand navbar-dark bg-danger"
    aria-label="Second navbar example"
  >
    <div class="container-fluid col-md-12">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarsExample02"
        aria-controls="navbarsExample02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExample02">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link to="/home"
              ><button type="button" class="btn bg-white me-2 text-dark">
                Accueil
              </button></router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/profile"
              ><button type="button" class="btn bg-white me-2 text-dark">
                Profil
              </button></router-link
            >
          </li>
        </ul>
        <form role="search">
          <input
            class="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
        <router-link to="/signin"
          ><button type="button" class="btn btn-warning ms-3 text-dark">
            Déconnexion
          </button></router-link
        >
      </div>
    </div>
  </nav>
</template>

<style scoped>
body {
  padding-bottom: 20px;
}

.navbar {
  margin-bottom: 20px;
}
</style>
