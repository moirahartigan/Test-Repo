function onCardClicked(e) {
    const target = e.currentTarget;
    target.className = target.className
    .replace('image-hidden', '')
    .trim();
}

// if statment 
