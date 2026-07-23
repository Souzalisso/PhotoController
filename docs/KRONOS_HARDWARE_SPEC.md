# KRONOS HARDWARE SPECIFICATION
Version: 1.0
Status: Approved
Project: KRONOS Lightroom Controller

---

# 1. Overview

KRONOS é um controlador físico dedicado exclusivamente ao Adobe Lightroom.

O objetivo é fornecer acesso rápido aos principais ajustes de edição de fotografias através de encoders rotativos, botões físicos e um display OLED central.

Todo o software deverá reproduzir exatamente este hardware.

O hardware é a referência principal do projeto.

Nenhuma interface poderá alterar sua disposição física.

---

# 2. Physical Layout

O equipamento é dividido em sete módulos físicos.

LEFT COLUMN

TOP ENCODERS

CENTER MODULE

BOTTOM ENCODERS

RIGHT COLUMN

STARS

BOTTOM ACTIONS

---

# 3. LEFT COLUMN

Quantidade:
6 botões

Tipo:
Botão momentâneo

Ordem:

1
UNDO

Command

undo

---------------------------------

2
REDO

Command

redo

---------------------------------

3
COPY

Command

copy-settings

---------------------------------

4
PASTE

Command

paste-settings

---------------------------------

5
SYNC

Command

sync-settings

---------------------------------

6
BEFORE / AFTER

Command

before-after

---

# 4. TOP ENCODERS

Quantidade

5

Todos possuem:

Rotação

Clique (Push)

LED circular

OLED Feedback

Lista

---------------------------------

Encoder 1

ID

exposure

Label

EXPOSIÇÃO

Command

exposure

---------------------------------

Encoder 2

contrast

CONTRASTE

contrast

---------------------------------

Encoder 3

highlights

REALCES

highlights

---------------------------------

Encoder 4

shadows

SOMBRAS

shadows

---------------------------------

Encoder 5

whites

BRANCOS

whites

---

# 5. CENTER MODULE

O centro do equipamento contém o display principal.

Além dele existem três encoders.

Display

Tipo

OLED

Uso

Nome do controle

Valor

Menu

Status

Conexão

Perfil

---------------------------------

LEFT ENCODER

ID

encoder-left

Tipo

Encoder Push

Função padrão

Navegação Menu

---------------------------------

CENTER ENCODER

ID

encoder-main

Tipo

Encoder Push

Função padrão

Confirmar

Scroll

Selecionar

---------------------------------

RIGHT ENCODER

ID

encoder-right

Tipo

Encoder Push

Função padrão

Zoom

---

# 6. BOTTOM ENCODERS

Quantidade

5

Todos

Encoder Push

LED Circular

---------------------------------

1

blacks

PRETOS

Command

blacks

---------------------------------

2

temperature

TEMPERATURA

temperature

---------------------------------

3

tint

MATIZ

tint

---------------------------------

4

vibrance

VIBRATILIDADE

vibrance

---------------------------------

5

saturation

SATURAÇÃO

saturation

---

# 7. RIGHT COLUMN

Quantidade

3

Botões

---------------------------------

P1

Programável

---------------------------------

P2

Programável

---------------------------------

EDIT

Modo edição

---

# 8. STARS

Quantidade

5

Botões

★

Command

rate-1

---------------------------------

★★

rate-2

---------------------------------

★★★

rate-3

---------------------------------

★★★★

rate-4

---------------------------------

★★★★★

rate-5

---

# 9. ACTION BUTTONS

Quantidade

6

---------------------------------

PICK

pick

---------------------------------

REJECT

reject

---------------------------------

PREVIOUS

previous-photo

---------------------------------

NEXT

next-photo

---------------------------------

FIT

fit

---------------------------------

1:1

zoom-1-1

---

# 10. Hardware Object Model

Todo controle deverá possuir a seguinte estrutura.

{
    id,
    label,
    type,
    command,
    group,
    position,
    configurable,
    push,
    led,
    defaultValue,
    firmwarePin
}

---

# 11. Control Types

button

Botão momentâneo

---------------------------------

encoder

Encoder rotativo

Com clique

---------------------------------

display

OLED

---

# 12. Groups

left

top

center

bottom

right

stars

actions

---

# 13. Default Behaviour

Ao girar um encoder

↓

Enviar evento

ROTATE

---------------------------------

Ao pressionar encoder

↓

Enviar evento

PUSH

---------------------------------

Ao pressionar botão

↓

Enviar evento

PRESS

---------------------------------

Ao soltar botão

↓

Enviar

RELEASE

---

# 14. Event Model

Todos os eventos do hardware utilizarão o protocolo.

DEVICE

↓

CONTROL_ID

↓

ACTION

↓

VALUE

Exemplo

KRONOS

↓

EXPOSURE

↓

ROTATE

↓

+3

Outro exemplo

KRONOS

↓

UNDO

↓

PRESS

↓

1

---

# 15. Communication Protocol

Formato

KRONOS|CONTROL|ACTION|VALUE

Exemplos

KRONOS|EXPOSURE|ROTATE|4

KRONOS|UNDO|PRESS|1

KRONOS|UNDO|RELEASE|0

KRONOS|ZOOM|ROTATE|-2

---

# 16. Software Architecture

KronosControls

↓

KronosRenderer

↓

KronosCanvas

↓

KronosDesigner

↓

HardwareService

↓

ConfigurationManager

↓

LightroomService

---

# 17. Configuration File

config.json

Cada controle poderá sobrescrever:

command

sensitivity

invertRotation

enabled

ledColor

---

# 18. Firmware

Firmware nunca conhecerá Lightroom.

Firmware conhece apenas

ID

ACTION

VALUE

---

# 19. Renderer

Renderer nunca executa comandos.

Renderer apenas desenha.

---

# 20. Designer

Responsável por montar toda a interface.

---

# 21. Goal

Todo desenvolvimento do KRONOS deverá seguir esta especificação.

Nenhum componente poderá divergir da disposição física do hardware.

Esta especificação é considerada a fonte oficial do projeto.
