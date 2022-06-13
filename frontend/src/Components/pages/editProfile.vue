<script>
import headerHome from "../../Components/layouts/headerHome.vue";
import footerPage from "../../Components/layouts/footerPage.vue";
export default {
  name: "editProfil",
  components: { headerHome, footerPage },
};
</script>

<template>
  <headerHome />
  <div class="d-flex flex-column align-items-center text-center">
    <img src="/profile-user.jpg" alt="Admin" class="rounded-circle" />
    <label id="hover-button" for="input-file">
      <i class="bi bi-camera-fill"></i>
    </label>
    <div class="mt-3">
      <h4>John Doe</h4>
      <p class="text-secondary mb-1">Full Stack Developer</p>
      <p class="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
    </div>
  </div>

  <div>
    <div class="card">
      <div class="card-body">
        <div class="row mb-3">
          <div class="col-sm-3">
            <h6 class="mb-0">Full Name</h6>
          </div>
          <div class="col-sm-9 text-secondary">
            <input type="text" class="form-control" value="John Doe" />
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-sm-3">
            <h6 class="mb-0">Email</h6>
          </div>
          <div class="col-sm-9 text-secondary">
            <input type="text" class="form-control" value="john@example.com" />
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-sm-3">
            <h6 class="mb-0">Phone</h6>
          </div>
          <div class="col-sm-9 text-secondary">
            <input type="text" class="form-control" value="(239) 816-9029" />
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-sm-3">
            <h6 class="mb-0">Mobile</h6>
          </div>
          <div class="col-sm-9 text-secondary">
            <input type="text" class="form-control" value="(320) 380-4539" />
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-sm-3">
            <h6 class="mb-0">Address</h6>
          </div>
          <div class="col-sm-9 text-secondary">
            <input
              type="text"
              class="form-control"
              value="Bay Area, San Francisco, CA"
            />
          </div>
        </div>
        <div class="row">
          <div class="text-secondary center">
            <input type="button" class="btn btn-danger px-4" value="Modifier" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <footerPage />
</template>

<style scoped>
@media (max-width: 768px) {
  .card-body {
    width: fit-content;
  }
}
.center {
  display: block;
  width: 10rem;
  margin: auto;
}

img {
  width: 11rem;
  height: 11rem;
  object-fit: cover;
}
label > .bi-camera-fill {
  font-size: 2rem;
  color: #4e5166;
}
#hover-button:hover {
  transform: scale(1.2);
}
.bi-camera-fill:hover {
  color: #fd2d01;
  cursor: pointer;
}
input[type="file"] {
  display: none;
}
#center {
  margin: auto;
}
body {
  background: #f7f7ff;
  margin-top: 20px;
}
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 0 solid transparent;
  border-radius: 0.25rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 6px 0 rgb(218 218 253 / 65%),
    0 2px 6px 0 rgb(206 206 238 / 54%);
  width: 60rem;
  margin: auto;
}
.me-2 {
  margin-right: 0.5rem !important;
}
</style>
