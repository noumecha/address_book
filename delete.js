export function deleteAddress(address, id) {
    const parseId = parseInt(id, 10);
    const filtereAddresses = address.filter(
        (address) => address.id !== parseId
    )
    return filtereAddresses
}