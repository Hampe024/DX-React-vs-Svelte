<script lang="ts">
    let firstName = "";
    let lastName = "";
    let email = "";
    let when = "default";
  
    function handleSubmit(e: SubmitEvent): void {
        e.preventDefault();
        alert(JSON.stringify({ firstName, lastName, email, when }));
    }
</script>

<div class="formBody">
<p class="formHeader">Want to subscribe to our newsletter?</p>
    <form on:submit={handleSubmit} class="newspapperForm">
        <input bind:value={firstName} placeholder="First name" required class="formChild" />
        <input bind:value={lastName} placeholder="Last name" required class="formChild" />
        <input bind:value={email} placeholder="Email" required class="formChild" />
        <select bind:value={when} required class="formChild">
            <option value="default" disabled>How often?</option>
            <option value="Every week">Every week ($129/year)</option>
            <option value="Every month">Every month ($49/year)</option>
        </select>
        <input type="submit" value="Subscribe" class="formChild submitBtn" />
    </form>
</div>
  

<style>
    .formBody {
        margin: auto;
        width: 700px;
        background-color: rgb(241, 241, 241);
        border-radius: 10px;
        box-shadow: 10px 10px 20px rgb(124, 124, 124);
    }

    .formHeader {
        text-align: center;
        font-size: 2rem;
        padding-top: 1rem;
    }

    .newspapperForm {
        margin-top: -2rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .formChild:nth-child(3) {
        grid-column: 1 / 3;
    }

    .formChild {
        width: auto;
        padding: 0.5rem;
        margin: 1rem;
        font-size: 1.5rem;
        border-radius: 8px;
        box-shadow: 3px 3px 10px rgb(124, 124, 124);
    }

    .submitBtn {
        transition: background-color ease 700ms;
        cursor: pointer;
    }

    .submitBtn:hover {
        background-color: rgb(200, 200, 200);
    }
</style>