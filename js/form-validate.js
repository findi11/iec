document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const phoneInput = document.getElementById('phone');
    const promoInput = form.querySelector('[name="promo_code"]');
    const validPromoCode = 'philmarine25';

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isFormValid = true;
        let firstInvalid = null;

        const allFields = [
            { element: form.querySelector('[name="first-name"]'), validate: validateName },
            { element: form.querySelector('[name="last-name"]'), validate: validateName },
            { element: form.querySelector('[name="company"]'), validate: validateRequired },
            { element: phoneInput, validate: validatePhone },
            { element: form.querySelector('[name="email"]'), validate: validateEmail },
            { element: document.getElementById('country'), validate: validateSelect, parentHighlight: true },
            { element: document.getElementById('interest'), validate: validateMultiSelect, parentHighlight: true },
            { element: form.querySelector('[name="message"]'), validate: validateRequired },
            { element: document.getElementById('hear'), validate: validateSelect2 , parentHighlight: true },
            { element: promoInput, validate: validatePromo }
        ];

        allFields.forEach(({ element, validate, parentHighlight }) => {
            const isValid = validate(element);
            const target = parentHighlight ? element.parentElement : element;
            target.classList.toggle('field-invalid', !isValid);

            if (!isValid && !firstInvalid) {
                firstInvalid = element;
            }

            if (!isValid) isFormValid = false;
        });

        if (!isFormValid && firstInvalid) {
            firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            console.log(data);
        }
    });

    function validateRequired(el) {
        return el.value.trim() !== '';
    }

    function validatePhone(el) {
        return /^\+?[0-9]{10,15}$/.test(el.value.trim());
    }

    function validateEmail(el) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim());
    }

    function validateSelect(el) {
        return el.value && el.value.trim() !== '';
    }

    function validateMultiSelect(el) {
        return el.selectedOptions && el.selectedOptions.length > 0;
    }

    function validateSelect2(el) {
        const value = $(el).val();
        return value && value.length > 0;
    }

    function validateName(el) {
        const val = el.value.trim();
        return /^[A-Za-zА-Яа-яЁёЇїІіЄєҐґ]{2,}$/.test(val);
    }

    function validatePromo(el) {
        const val = el.value.trim().toLowerCase();
        return val === '' || val === validPromoCode;
    }
});
