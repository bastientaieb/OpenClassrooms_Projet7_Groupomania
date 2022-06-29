<!-- Components Footer -->
<script>
export default {
  name: "footerPage",
};
</script>

<template>
  <footer class="py-5 col-12 mt-1">
    <div
      class="d-flex flex-column ms-5 flex-sm-row justify-content-between border-top"
    >
      <p class="pt-3">&copy; 2022 Groupomania, Inc. All rights reserved.</p>
      <div class="col-md-5 offset-md-1 mb-3 me-5 pt-3">
        <form>
          <h5>Souscrivez à la newsletter de Groupomania</h5>
          <p>
            Pour être au courant des évènements l'entreprise et bien d'autres
            surprises...
          </p>
          <div class="d-flex flex-column flex-sm-row w-100 gap-2">
            <label for="newsletter1" class="visually-hidden"
              >Email address</label
            >
            <input
              id="newsletter1"
              type="text"
              class="form-control"
              placeholder="Email address"
            />
            <button class="btn" type="button">Subscribe</button>
          </div>
        </form>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* col-12 = width 100% bootstrap */
.btn {
  background-color: var(--redCG) !important;
  color: white;
}
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}

.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow: inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.b-example-vr {
  flex-shrink: 0;
  width: 1.5rem;
  height: 100vh;
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.nav-scroller {
  position: relative;
  z-index: 2;
  height: 2.75rem;
  overflow-y: hidden;
}

.nav-scroller .nav {
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: 1rem;
  margin-top: -1px;
  overflow-x: auto;
  text-align: center;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}
</style>
