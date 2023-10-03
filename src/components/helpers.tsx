import { MouseEventHandler, useState } from 'react';
import { isDomainAvailable } from '../lib/resources';

export const handleAddDomain = async (domainName: string, cart: string[], setCart: React.Dispatch<React.SetStateAction<string[]>>, setAvailability: React.Dispatch<React.SetStateAction<Record<string, boolean>>>) => {
    // Validate the domain input
    //https://stackoverflow.com/questions/10306690/what-is-a-regular-expression-which-will-match-a-valid-domain-name-without-a-subd
    const domainPattern: RegExp = /^(((?!-))(xn--|_)?[a-z0-9-]{0,61}[a-z0-9]{1,1}\.)*(xn--)?([a-z0-9][a-z0-9\-]{0,60}|[a-z0-9-]{1,30}\.[a-z]{2,})$/;
    const validTLDs: string[] = ['.com', '.xyz', '.app'];
    const domainTLD: string = domainName.slice(domainName.lastIndexOf('.'));

    if (!domainPattern.test(domainName) || !validTLDs.includes(domainTLD)) {
        alert('Invalid domain name. Please enter a valid domain.');
        return;
    }

    // Check for duplicates in the cart
    if (cart.includes(domainName)) {
        alert('Domain already in the cart.');
        return;
    }

    // Add the domain to the cart
    setCart((prevCart) => [...prevCart, domainName]);

    // Check the domain's availability
    //all domain avaliabilites are coming back false at the moment
    const available: boolean = await isDomainAvailable(domainName);
    setAvailability((prev) => ({ ...prev, [domainName]: available }));
};

export const removeUnavaliable = (cart: string[], availability: Record<string, boolean>, setCart: React.Dispatch<React.SetStateAction<string[]>>) => {
    // Filter the cart to remove unavailable domains
    const newCart: string[] = cart?.filter((x) => availability[x]);

    // Update the cart with the filtered domains
    setCart(newCart || [...cart]);
    alert("Unavaliable Domains Removed!")
}

export const copyToClipboard = (text: string) => {
    // Write the text to the clipboard
    navigator.clipboard.writeText(text)
        .then(() => {
            // Display a success message
            alert('Text copied to clipboard');
        })
        .catch((error) => {
            // Display an error message if copying fails
            console.error('Failed to copy text to clipboard:', error);
            alert(`Failed to copy text to clipboard`);
        });
}

export const keepBestDomains = (cart: string[], setCart: React.Dispatch<React.SetStateAction<string[]>>, maxDomains: number) => {
    // Sort the cart based on domain ending order and length
    const newDomains = cart
        .sort((a, b) => {
            const domainEndingOrder: string[] = ['.com', '.app', '.xyz'];
            const aEnding: number = domainEndingOrder.indexOf(a.slice(-4));
            const bEnding: number = domainEndingOrder.indexOf(b.slice(-4));

            // Compare the domain endings
            if (aEnding !== bEnding) {
                return aEnding - bEnding;
            } else {
                // If the domain endings are the same, compare the lengths
                return a.length - b.length;
            }
        })
        // Keep only the top 'maxDomains' domains
        .slice(0, maxDomains);

    // Update the cart with the new domains
    setCart(newDomains);
    alert(`Cart Updated With Best Selection!`)
}

export const deleteDomain = (domain: string, cart: string[], setCart: React.Dispatch<React.SetStateAction<string[]>>) => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
        const copy = cart.slice();
        const index = copy.indexOf(domain);
        if (index > -1) {
            copy.splice(index, 1);
            setCart(copy);
            alert(`${domain} Deleted!`)
        }
    };
}