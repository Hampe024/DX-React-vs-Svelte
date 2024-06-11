<script lang="ts">
</script>

<nav class="nav">
    <a href="/">Home</a>
    <a href="/graph">GDP graph</a>
    <a href="/weather">Weather</a>
</nav>

<style>
    .nav {
        margin: auto;
        width: fit-content;
        padding-top: 0.5rem;
    }

    .nav a {
        margin-left: -0.3rem;
        padding: 1rem;
        font-size: 2rem;
        text-decoration: none;
        color: black;
        font-weight: 500;
        background-color: rgb(228, 228, 228);
        box-shadow: 10px 20px 20px rgb(198, 198, 198);
        transition: background-color ease 700ms;
        transition: box-shadow ease 700ms;
    }

    .nav a:first-child {
        padding-left: 3rem;
        border-radius: 0 0 0 99px;
    }

    .nav a:last-child {
        padding-right: 3rem;
        border-radius: 0 0 99px 0;
    }

    .nav a:hover {
        background-color: rgb(255, 255, 255);
        box-shadow: 0 0 0 rgb(255, 255, 255);
    }
</style>
