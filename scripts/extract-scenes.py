"""One-off helper: lifts the illustrated scenes out of the Journey mockup
into src/scenes/*.svg so the site can inline them. Kept for reference."""
import re
src = open('reference/mockup/Journey.dc.html', encoding='utf-8').read()
def outer_svg_at(line_no):
    # find the first <svg on that line and return it up to its matching </svg>
    start = sum(len(l) + 1 for l in src.split('\n')[:line_no - 1])
    start = src.index('<svg', start)
    depth, i = 0, start
    for m in re.finditer(r'<svg\b|</svg>', src[start:]):
        depth += 1 if m.group(0) == '<svg' else -1
        if depth == 0:
            return src[start:start + m.end()]
    raise ValueError(line_no)
wanted = {70: 'hero', 285: 'study', 444: 'air-university-postcard', 985: 'workshop', 1300: 'library', 1567: 'door', 799: 'corridor-wall', 739: 'gallery-wall'}
for line, name in wanted.items():
    svg = outer_svg_at(line)
    open_tag = re.match(r'<svg[^>]*>', svg).group(0)
    new_tag = re.sub(r'\sstyle="[^"]*"', '', open_tag)
    if 'xmlns=' not in new_tag:
        new_tag = new_tag.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"', 1)
    out = new_tag + svg[len(open_tag):]
    out = out.replace('></path>', '/>').replace('></rect>', '/>').replace('></circle>', '/>').replace('></ellipse>', '/>').replace('></stop>', '/>').replace('></line>', '/>').replace('></polygon>', '/>')
    # corrections so the art matches docs/portfolio-content.md
    if name == 'workshop':
        out = out.replace('>v0.2 ✓<', '>v1.3 ✓<')  # Khaaka is v1.3
    flags = []
    if '{{' in out: flags.append('TEMPLATE')
    if '<sc-' in out or '<x-' in out: flags.append('DC-TAG')
    if '_blob' in out: flags.append('BLOB')
    open(f'src/scenes/{name}.svg', 'w', encoding='utf-8').write(out)
    print(f'{name:26s} {len(out):6d} bytes  {" ".join(flags)}')
