import mongoose, { Document, Schema, model } from "mongoose";

const emailSchema = new mongoose.Schema({
  username: { type: String, required: true },
  domain: { type: String, required: true },
});

emailSchema.index({ username: 1, domain: 1 }, { unique: true });
emailSchema.methods.toString = function () {
  return this.username + "@" + this.domain;
};

export const Email =
  mongoose.models.email || mongoose.model("email", emailSchema);

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "email",
    unique: true,
    required: true,
  },
  password: { type: String, required: true },
  image: {
    type: String,
    default:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/wAALCAFoAWgBAREA/8QAGwABAAMBAQEBAAAAAAAAAAAAAAQFBgMCAQj/xAA7EAEAAgECAwQFCwIHAQEAAAAAAQIDBAURITEGEkFREyJxgdEUI0JSYXKRobHB4TJjFTNDYoKS8DRU/9oACAEBAAA/AP2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD5e1aVm17RWsdZmeEQqtXv+iwzNcXe1Fo+pyj8ZVeftHrL8fRY8WKPZ3p/NEvu+5X66zJH3eEfo5/4jr+P/wBuf/vLpj3fcqdNXkn73Cf1S9P2j1lP87Hiyx7O7P5LTR7/AKLNMVy97T2/3c4/GFrS1b1i1LRas9JieMS+gAAAAAAAAAACr3becGj72LHwzZ4+jE8q+2f2ZjW63U6y/e1GWbR4VjlWPZCOAAkaHW6nR372nyzWPGs86z7Yafad5wazhiycMOf6szyt7J/ZaAAAAAAAAAAAz2/b1MTbS6K/PpfLH6R8WdAAAGi2Hepma6XW359KZZ/Sfi0IAAAAAAAAACj7S7nOCs6PBbhktHzlo+jHl7ZZgAAABp+zO5zmr8jz245Kx83afpR5e2F4AAAAAAAAAI256uui0WTUW4TMcqx52npDD5L3yZLZMlpte08bTPjLyAAAA9Yr3xZK5Mdpres8azHhLcbZq663RU1FeETPK0eVo6wkgAAAAAAAAMt2s1XpNZXS1n1cMcZ+9P8AClAAAABddktV6LWW0tp9XNHGPvR/DUgAAAAAAAA+XtFKWvb+msTM+yGAz5bZs+TNb+rJabT73gAAAAHvT5bYM+PNX+qlotHub+lq3pF6/wBNoiY9j6AAAAAAAAIW+5JxbPqbRPOad2PfPBiQAAAABtthyel2jTWnrFO7PungmgAAAAAAACq7Uzw2e8eeSsfmyIAAAAA13ZWeOz1jyyWj81qAAAAAAAAKvtTHHZ7z5XrP5sgAAAAANf2Vjhs9J872n81oAAAAAAAAIW945y7RqaR17nej3c/2YkAAAAAbfY8foto01J69zvT7+f7pgAAAAAAAA+WrFqzW3SY4T7GB1OG2n1OXBbrjtNfwcwAAAAdNLhtqNTjwV65LRX8W+rWK1itekRwj2PoAAAAAAAAMx2t0k49TTV1j1ckd233o/j9FGAAAAC87I6Sb6m+rtHq4o7tfvT/H6tOAAAAAAAAA4bhpaazR5NPfl3o5T5T4Sw2fFfDmvhy17t6TwtDwAAAA94MV8+amHFXvXvPCsNzt+lpo9HTT0592Oc+c+Mu4AAAAAAAAApu0e2TqsfynBXjnpHrRH04+MMqAAAA1XZvbJ0uP5Tnrwz3j1Yn6EfGVyAAAAAAAAAAot92X0021WkrHpet8f1vtj7f1ZmYmJmJiYmOUxPgAAAVibTEViZmeURHi02w7L6Ga6rV1+d60x/V+2ftXoAAAAAAAAAAK/dNp0+uibz83m8MlY6+2PFmNw23V6KZ9Lj408Mledf496GAAmbftur1s/NY+FPHJblX+fc0+1bTp9DHfj5zN45LR09keCwAAAAAAAAABw1mr0+kx9/UZYpHhHjPshn9f2hz5ONNJT0Nfr252n9oSNk32LRGn11uFulcs9J+98V/HMJiJiYnnE9VbrNk0Go42jHOG8+OPl+XRV5+zWaOPoNTjvHleJrP7ol9i3KvTBW/3bw5/4PuX/wCS/wCMfF0x7Hud+uCtPvXiEvT9ms0/5+px0jypEzP7LTR7JoNPwtOOc148ck8fy6LKIiI4RyiAUG9b7FYtp9DbjbpbLHSPu/FH2/tDnx8Kaunpq/XrytH7S0Gj1en1ePv6fLF4jrHjHth3AAAAAAAB8mYrEzaYiI5zM+Ch3TtBWnexaGIvbpOWY5R7I8WezZcmbJOTLe17z1taeMvAstq3jU6Lhjn57D9S0849k+DTbfuOk1tfmckRfxpblaPj7ksAAETX7jpNFWfTZIm/hSvO0/D3szum8anW8ccfM4Z+hWevtnxVo94cuTDkjJival46WrPCWh2rtBW/DFroilukZYjlPtjwX1Zi0RNZiYnnEx4voAAAAAAOOs1OHSYJzZ7xWsfjM+UMlu2659daac8eDjypE9ftnzV4ARMxPGJ4THSVnot812n4VteM9I8MnX8eq203aLSX5Z8eTDPnw70LDDuOhzf5erwzPlNuE/mk1tW0eras+yeL7wnyfLWrWPWtWPbPBGzbjocPH0mrwxMeEW4z+Sv1PaLSU4xgx5M0+cx3Y/PmqdZvmu1HGtbxgpPhj6/j1VkzMzMzPGZ6yACw2jdc+gtFOeTBM86TPT7Y8mt0epw6vBGbBeLVn8Ynyl2AAAAAARtx1uHQ6ecuWeMzyrSOtpY3cNbn1uecua33ax0rHlCOAAARy6cvY9d+/wBe/wD2l5nn15+0AAASNv1ufRZ4y4bferPS0eUtltutw67T+lxTwmOVqT1rKSAAAAAI+4azFotNbNln7K1jrafKGL12rzazUWzZrcZnlER0rHlDgAAAAAAAA76DV5tHqIzYbcJjlMT0tHlLabfrMWt00ZsU/Zas9az5SkAAAAA8Z8uPDhvmy2itKRxmWK3XXZNfqpy241pHKlPqx8UQAAAAAAAAEvaddk0GpjLXjak8r0+tHxbXBlx58Nc2K0WpeOMTD2AAAAMr2m3H5RnnS4rfNY59aY+lb4QpgAAAAAAAABc9mNx+T5/kuW3zWSfVmfo2+EtUAAAAre0Ov+R6Ka454Zsvq0+yPGWOAAAAAAAAAAbHs9r/AJZou7eeObF6t/tjwlZAAABMxETMzwiOssPu+snW66+bjPcj1cceVY/9xRAAAAAAAAAAEvZ9ZOi11M3Ge5Pq3jzrP/uLcRMTHGJ4xPSQAABVdp9X8n2+cVZ4XzT3f+Pj8PeyIAAAAAAAAAANd2X1fyjb/RWnjfBPd/4+Hw9y1AAAY7tHqflG6XrE8aYvm6+7r+atAAAAAAAAAABZdm9T8n3SlZnhTL83b39PzbEAAHHWZo02kzZ5/wBOkz7/AAYKZmZmbTxmZ4zIAAAAAAAAAABWZrMTWeExPGJb3RZo1GkxZ4/1KRPv8XYAAU/azN6PbYxRPPLeI90c/gygAAAAAAAAAAA1fZLN6TbbYpnnivMe6efxXAAAzHbDL3tXhw8eVKd6fbM/wowAAAAAAAAAABedjsvd1efDx5XpFo9sT/LTgADG9pL9/ec3+2K1/CFcAAAAAAAAAAALHs1fubzh/wB0Wr+MS2QAAw272726aq39236ooAAAAAAAAAAAlbRbu7ppbf3a/q3IABHVgtdPHXaif7tv1lxAAAAAAAAAAAHbQTw12nn+7X9Yb2esgP/Z",
  },
  public_key: { type: "string", required: true },
  private_key: { type: "string", required: true },
  contacts: [{ type: mongoose.Types.ObjectId, ref: "user" }],
});

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;
