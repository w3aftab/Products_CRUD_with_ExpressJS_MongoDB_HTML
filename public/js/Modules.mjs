export const displayProduct = (data) => {
  const { _id, name, price, image } = data;
  return /* HTML */ `
    <article class="card flex">
      <div class="flex-items">
        <h3>${name}</h3>
        <p>Price: $${price.toFixed(2)}</p>
        <a type="button" href="/details/${_id}">Details</a>
      </div>
      <div class="flex-items">
        <figure class="image">
          <img src="${image}" alt="${name}" />
        </figure>
      </div>
    </article>
  `;
};
