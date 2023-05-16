export function saveAddress(addresses, address) {
    if (address.id) {
        const index = addresses.findIndex((adr) => {
            return adr.id === parseInt(address.id, 10);
        })
        address.id = parseInt(address.id, 10);
        addresses[index] = address;
    } else {
        const nextId = Math.max(...addresses.map((address) => address.id)) + 1;
        address.id = nextId;
        addresses.push(address);
    }
    return addresses;
}