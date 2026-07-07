<script lang="ts">
export default {

  methods: {
    async onSubmit(event: SubmitEvent) {
      event.preventDefault()
      if (!(event.target instanceof HTMLFormElement)) return

      const form = event.target
      const getValue = (name: string) =>
        (form.elements.namedItem(name) as HTMLInputElement).value.trim()

      try {
        await $fetch('/api/contact', {
          method: 'POST',
          body: {
            name: getValue('name'),
            email: getValue('email'),
            message: getValue('message'),
          }
        })
        alert("Your message was sent!")
        form.reset()
      } catch (err) {
        alert("Something went wrong :(")
      }
    }
  },
}
</script>

<template>
  <div>
    <form id="contact-form" @submit="onSubmit">
      <h1>message me!</h1>
      <fieldset>
        <label for="name-input">your name</label>
        <input
id="name-input" type="text" name="name" placeholder="namey name" maxlength="255" aria-required="true"
          required>
      </fieldset>
      <fieldset>
        <label for="email-input">your email</label>
        <input
id="email-input" type="email" name="email" placeholder="email@email.com" maxlength="255"
          aria-required="true" required>
      </fieldset>
      <fieldset>
        <label for="message-input">your message</label>
        <textarea
id="message-input" name="message" placeholder="blah blah blah" rows="3" maxlength="255"
          aria-required="true" required />
      </fieldset>
      <button type="submit">Send</button>
    </form>
  </div>
</template>

<style scoped lang="css">
div {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

form {
  width: 100%;
  max-width: 600px;
  margin-left: auto;
  margin-top: auto;
  padding: var(--space-4) var(--space-1) var(--space-1);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  font-family: var(--font-space);
}

h1 {
  text-align: right;
}

fieldset {
  border: none;
  padding: 0;
  margin: 0;
}

label {
  display: block;
  text-align: right;
  padding-bottom: calc(var(--space-1) / 2);
  padding-right: calc(var(--space-1) / 6);
}

input,
textarea {
  width: 100%;
  padding: var(--space-1);
  background-color: transparent;
  border: 1px solid black;
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  text-align: right;
}

input:focus,
textarea:focus {
  outline: 2px solid black;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

textarea {
  resize: none;
}

button {
  padding: var(--space-1);
  border: 1px solid black;
  background-color: black;
  color: white;
  font-family: var(--font-space);
  font-size: var(--text-sm);
  font-weight: bold;
  cursor: pointer;
  text-align: right;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

button:hover,
button:focus,
button:focus-visible {
  background-color: var(--magenta);
  border: 1px solid var(--magenta);
  outline: 2px solid var(--magenta)
}
</style>